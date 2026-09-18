import React, { useState, useMemo } from 'react';
import { instructorProfile, categories, coursesList } from '../data/portalData';

export default function PortalPage({ onOpenCourseApp }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCodeModal, setShowCodeModal] = useState(false);

  // Filter courses based on category and search query
  const filteredCourses = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return coursesList.filter(course => {
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      const matchesSearch =
        term === '' ||
        course.title.toLowerCase().includes(term) ||
        course.enTitle.toLowerCase().includes(term) ||
        course.code.toLowerCase().includes(term) ||
        course.description.toLowerCase().includes(term) ||
        course.highlights.some(h => h.toLowerCase().includes(term));
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const handleDownloadHtml = () => {
    const link = document.createElement('a');
    link.href = './portal.html';
    link.download = 'index.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased selection:bg-emerald-500 selection:text-white" dir="rtl">

      {/* Header / Navbar */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-black text-lg shadow-sm">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <div>
              <h1 className="font-black text-base sm:text-lg leading-tight text-white">بوابة المقررات الأكاديمية</h1>
              <p className="text-xs text-slate-400">{instructorProfile.name} | {instructorProfile.institution}</p>
            </div>
          </div>

          {/* Quick Contact - Telegram, Email & Export */}
          <div className="flex items-center space-x-2 space-x-reverse">
            {instructorProfile.telegramUsername && (
              <a
                href={instructorProfile.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/30 text-sky-300 hover:text-sky-200 text-xs font-bold rounded-lg transition"
                title="تواصل عبر تليجرام"
              >
                <i className="fa-brands fa-telegram text-sm text-sky-400"></i>
                <span className="hidden sm:inline">تليجرام:</span>
                <span dir="ltr">@{instructorProfile.telegramUsername}</span>
              </a>
            )}

            {instructorProfile.email && (
              <a
                href={`mailto:${instructorProfile.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/30 text-emerald-300 hover:text-emerald-200 text-xs font-bold rounded-lg transition"
                title="تواصل عبر البريد الأكاديمي"
              >
                <i className="fa-solid fa-envelope text-sm text-emerald-400"></i>
                <span dir="ltr">{instructorProfile.email}</span>
              </a>
            )}

            {/* Standalone HTML Actions */}
            <button
              onClick={() => setShowCodeModal(true)}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold rounded-lg transition"
              title="تصدير كود HTML جاهز للرفع على GitHub"
            >
              <i className="fa-solid fa-code text-xs"></i>
              <span>كود GitHub</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero & Profile Section */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800 shadow-inner">
        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl flex flex-col md:flex-row items-center md:items-start gap-6">

            {/* Profile Avatar */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-1 shadow-lg shadow-emerald-900/30">
                <div className="w-full h-full bg-slate-900 rounded-xl flex flex-col items-center justify-center text-white">
                  <i className="fa-solid fa-user-tie text-3xl sm:text-4xl text-emerald-400 mb-1"></i>
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider">SAAD ALAMRI</span>
                </div>
              </div>
              <span className="absolute -bottom-2 -left-2 bg-emerald-500 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full border-2 border-slate-900 flex items-center gap-1 shadow">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping"></span> متاح أكاديمياً
              </span>
            </div>

            {/* Profile Information & Bio */}
            <div className="flex-grow text-center md:text-right">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white">{instructorProfile.name}</h2>
                <span className="text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-md font-bold">
                  {instructorProfile.role}
                </span>
                <span className="text-xs bg-slate-700 text-slate-300 px-2.5 py-0.5 rounded-md font-medium">
                  {instructorProfile.institution}
                </span>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-5 max-w-3xl">
                {instructorProfile.bio}
              </p>

              {/* Contact Badges - Telegram & Email */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 text-xs">
                {instructorProfile.telegramUsername && (
                  <a
                    href={instructorProfile.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl transition shadow-sm"
                  >
                    <i className="fa-brands fa-telegram text-base"></i>
                    <span>تليجرام: <span dir="ltr">@{instructorProfile.telegramUsername}</span></span>
                  </a>
                )}

                {instructorProfile.email && (
                  <a
                    href={`mailto:${instructorProfile.email}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition shadow-sm"
                  >
                    <i className="fa-solid fa-envelope text-white"></i>
                    <span>البريد الأكاديمي: <span dir="ltr">{instructorProfile.email}</span></span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Search Bar & Counter */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ابحث باسم المقرر، الرمز، أو الكلمات المفتاحية..."
                className="w-full pr-10 pl-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition shadow-inner"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 hover:text-white"
                >
                  <i className="fa-solid fa-xmark text-xs"></i>
                </button>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 text-xs text-slate-300">
              <div className="px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl flex items-center gap-2">
                <i className="fa-solid fa-book-bookmark text-emerald-400"></i>
                <span>المقررات المعروضة: <strong className="text-white text-sm">{filteredCourses.length}</strong> من {coursesList.length}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const count = cat.id === 'all'
              ? coursesList.length
              : coursesList.filter(c => c.category === cat.id).length;
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 shadow-sm ${
                  isActive
                    ? 'bg-slate-900 text-white shadow'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <i className={`fa-solid ${cat.icon} text-xs`}></i>
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-slate-800 text-emerald-400' : 'bg-slate-100 text-slate-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden group hover:border-emerald-500"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {course.code}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-emerald-600 flex items-center justify-center text-lg group-hover:bg-emerald-600 group-hover:text-white transition">
                      <i className={`fa-solid ${course.icon}`}></i>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mb-3" dir="ltr">
                    {course.enTitle}
                  </p>

                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {course.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {course.highlights.map((tag, idx) => (
                      <span key={idx} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <i className="fa-solid fa-circle-check text-[10px]"></i>
                    منصة تفاعلية
                  </span>

                  <div className="flex items-center gap-2">
                    {course.id === 'adv_networks' && onOpenCourseApp && (
                      <button
                        onClick={onOpenCourseApp}
                        className="text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-lg transition"
                        title="معاينة داخل التطبيق"
                      >
                        معاينة
                      </button>
                    )}
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3.5 py-1.5 rounded-lg transition shadow-sm flex items-center gap-1.5"
                    >
                      <span>دخول المقرر</span>
                      <i className="fa-solid fa-arrow-left text-xs"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 my-6">
            <i className="fa-solid fa-folder-open text-4xl text-slate-300 mb-3"></i>
            <h4 className="text-lg font-bold text-slate-800 mb-1">لم يتم العثور على أي مقرر مطابق لـ "{searchTerm}"</h4>
            <p className="text-sm text-slate-500 mb-4">يرجى تجربة البحث بكلمات أخرى أو إعادة تعيين عامل التصفية.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="text-xs font-bold px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition"
            >
              عرض جميع المقررات
            </button>
          </div>
        )}

      </main>

      {/* GitHub Single-File Code Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <i className="fa-brands fa-github text-xl text-slate-900"></i>
                <h3 className="font-bold text-base text-slate-900">طريقة الرفع السريعة إلى GitHub Pages</h3>
              </div>
              <button onClick={() => setShowCodeModal(false)} className="text-slate-400 hover:text-slate-700">
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <div className="py-4 space-y-3 overflow-y-auto text-sm text-slate-600">
              <p className="font-semibold text-slate-800">
                لقد تم تجهيز ملف <code className="bg-slate-100 px-2 py-0.5 rounded text-emerald-700 font-mono text-xs">portal.html</code> متكامل ومستقل لا يحتاج أي أوامر تثبيت أو بناء:
              </p>

              <ol className="list-decimal list-inside space-y-2 text-xs leading-relaxed text-slate-700">
                <li>
                  <strong>تحميل الملف:</strong> اضغط على زر <em>تحميل index.html</em> بالأسفل لحفظ الملف على جهازك.
                </li>
                <li>
                  <strong>إنشاء مستودع جديد على GitHub:</strong> أنشئ مستودعاً جديداً (مثلاً: <code className="font-mono text-emerald-600">courses-portal</code> أو <code className="font-mono text-emerald-600">Saadalam-077.github.io</code>).
                </li>
                <li>
                  <strong>رفع الملف:</strong> ارفع ملف <code className="font-mono text-emerald-600">index.html</code> مباشرة إلى المستودع.
                </li>
                <li>
                  <strong>تفعيل GitHub Pages:</strong> من إعدادات المستودع (Settings) ⬅ (Pages) ⬅ اختر الفرع <strong>main</strong> واضغط <strong>Save</strong>.
                </li>
              </ol>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800 flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-emerald-600 text-base shrink-0"></i>
                <span>الصفحة جاهزة ومربوطة ببريدك الأكاديمي <strong>{instructorProfile.email}</strong> وجميع روابط المقررات الدراسية.</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setShowCodeModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                إغلاق
              </button>
              <button
                onClick={handleDownloadHtml}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition flex items-center gap-1.5 shadow-sm"
              >
                <i className="fa-solid fa-download"></i>
                <span>تحميل ملف index.html المستقل</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-center text-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 text-xs">
            <p>جميع الحقوق محفوظة © {instructorProfile.name} - {instructorProfile.institution}</p>
            <div className="flex items-center gap-4">
              {instructorProfile.telegramUsername && (
                <a
                  href={instructorProfile.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition flex items-center gap-1"
                >
                  <i className="fa-brands fa-telegram"></i> @{instructorProfile.telegramUsername}
                </a>
              )}
              {instructorProfile.email && (
                <a
                  href={`mailto:${instructorProfile.email}`}
                  className="hover:text-emerald-400 transition flex items-center gap-1"
                >
                  <i className="fa-solid fa-envelope"></i> البريد الأكاديمي: <span dir="ltr">{instructorProfile.email}</span>
                </a>
              )}
            </div>
          </div>
          <p className="text-[11px] text-slate-500">
            مستضاف عبر منصة GitHub Pages | صُممت البوابة لتمكين الطلاب وتقديم تجربة تعليمية برمجية حديثة
          </p>
        </div>
      </footer>

    </div>
  );
}
