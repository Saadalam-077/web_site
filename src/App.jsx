import React, { useState, useEffect } from 'react';
import { loginStudent, registerStudent, updateStudentProgress } from './dbService';
import PortalPage from './pages/PortalPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import WeekLesson from './pages/WeekLesson';

const STORAGE_KEY = 'netUser';

function App() {
  const [currentPage, setCurrentPage] = useState('portal');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const calculateGrade = (progress) => {
    const scores = Object.values(progress || {}).filter(p => p && p.completed).map(p => p.score);
    if (scores.length === 0) return { grade: 'N/A', avg: 0 };
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    let grade = 'F';
    if (avg >= 95) grade = 'A+';
    else if (avg >= 90) grade = 'A';
    else if (avg >= 85) grade = 'B+';
    else if (avg >= 80) grade = 'B';
    else if (avg >= 75) grade = 'C+';
    else if (avg >= 70) grade = 'C';
    else if (avg >= 65) grade = 'D+';
    else if (avg >= 60) grade = 'D';
    return { grade, avg };
  };

  const handleLogin = async (studentNumber, password) => {
    if (studentNumber === 'admin' && password === 'Saad@1234') {
      const adminUser = { isAdmin: true, studentName: 'Admin', studentNumber: 'admin' };
      setUser(adminUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(adminUser));
      setCurrentPage('admin');
      return true;
    }

    try {
      const res = await loginStudent(studentNumber, password);
      if (!res.success || !res.student) return false;

      const data = res.student;
      const progress = data.progress || {};
      const { grade, avg } = calculateGrade(progress);
      const userData = {
        id: data.id,
        studentName: data.student_name,
        studentNumber: data.student_number,
        sectionNumber: data.section_number,
        progress: progress,
        overallGrade: data.overall_grade && data.overall_grade !== 'N/A' ? data.overall_grade : grade,
        totalScore: typeof data.total_score === 'number' && data.total_score > 0 ? data.total_score : avg
      };
      setUser(userData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      setCurrentPage('home');
      return true;
    } catch (err) {
      console.error('Login error:', err);
      return false;
    }
  };

  const handleRegister = async (formData) => {
    try {
      const res = await registerStudent(formData);
      if (!res.success || !res.student) return false;

      const data = res.student;
      const userData = {
        id: data.id,
        studentName: data.student_name,
        studentNumber: data.student_number,
        sectionNumber: data.section_number,
        progress: {},
        overallGrade: 'N/A',
        totalScore: 0
      };
      setUser(userData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      setTimeout(() => setCurrentPage('home'), 1500);
      return true;
    } catch (err) {
      console.error('Register error:', err);
      return false;
    }
  };

  const handleExerciseComplete = async (weekNum, score) => {
    if (!user || user.isAdmin) return;
    
    const newProgress = {
      ...user.progress,
      [`week${weekNum}`]: { completed: true, score, completedAt: new Date().toISOString() }
    };

    const { grade, avg } = calculateGrade(newProgress);

    try {
      await updateStudentProgress(user.id, newProgress, avg, grade);

      const updatedUser = { ...user, progress: newProgress, overallGrade: grade, totalScore: avg };
      setUser(updatedUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    setCurrentPage('portal');
  };

  const handleNavigate = (page) => setCurrentPage(page);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center font-arabic">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white font-medium text-sm">جاري تحميل البوابة الأكاديمية...</p>
        </div>
      </div>
    );
  }

  // Course Back Bar for the sub-platform
  const renderCourseBackBar = () => (
    <div className="bg-slate-950 text-slate-300 px-4 py-2 text-xs flex items-center justify-between border-b border-slate-800" dir="rtl">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        <span>أنت تتصفح منصة: <strong>موضوعات متقدمة في الشبكات (NET-401)</strong></span>
      </div>
      <button
        onClick={() => setCurrentPage('portal')}
        className="px-3 py-1 bg-emerald-600/30 hover:bg-emerald-600 text-white font-bold rounded-lg transition flex items-center gap-1.5"
      >
        <i className="fa-solid fa-arrow-right text-[10px]"></i>
        <span>العودة لبوابة المقررات العامة</span>
      </button>
    </div>
  );

  if (currentPage === 'portal') {
    return (
      <PortalPage
        onOpenCourseApp={() => {
          if (user) setCurrentPage('home');
          else setCurrentPage('login');
        }}
      />
    );
  }

  if (currentPage === 'login') {
    return (
      <>
        {renderCourseBackBar()}
        <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentPage === 'register') {
    return (
      <>
        {renderCourseBackBar()}
        <RegisterPage onRegister={handleRegister} onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentPage === 'admin' && user?.isAdmin) {
    return (
      <>
        {renderCourseBackBar()}
        <AdminDashboard onLogout={handleLogout} />
      </>
    );
  }

  if (currentPage === 'home' && user) {
    return (
      <>
        {renderCourseBackBar()}
        <HomePage user={user} onNavigate={handleNavigate} onLogout={handleLogout} />
      </>
    );
  }

  if (currentPage === 'profile' && user) {
    return (
      <>
        {renderCourseBackBar()}
        <ProfilePage user={user} onNavigate={handleNavigate} onLogout={handleLogout} />
      </>
    );
  }

  if (currentPage.startsWith('week') && user) {
    const weekNum = parseInt(currentPage.replace('week', ''));
    return (
      <>
        {renderCourseBackBar()}
        <WeekLesson
          weekNum={weekNum}
          user={user}
          onNavigate={handleNavigate}
          onExerciseComplete={handleExerciseComplete}
          onLogout={handleLogout}
        />
      </>
    );
  }

  return <PortalPage onOpenCourseApp={() => setCurrentPage('login')} />;
}

export default App;
