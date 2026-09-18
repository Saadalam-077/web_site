export const instructorProfile = {
  name: "المحاضر /سعد بن صالح العمري",
  enName: "Saad Saleh Al-Amri",
  role: "عضو هيئة تدريس ومحاضر تقني",
  enRole: "Lecturer & Faculty Member",
  department: "قسم علوم الحاسب وتقنية المعلومات",
  institution: "جامعة الطائف",
  enInstitution: "Taif University",
  bio: "مرحباً بكم في البوابة الأكاديمية الشاملة. نوفر هنا بوابات تعليمية تفاعلية لكل مقرر دراسي تشمل الشروحات، الأكواد البرمجية، بنوك الأسئلة، والمتابعة المباشرة لمستوى الطلاب.",
  email: "saad_1406@hotmail.com",
  telegramUsername: "saadsa85",
  telegramUrl: "https://t.me/saadsa85"
};

export const categories = [
  { id: 'all', label: 'جميع المقررات', enLabel: 'All Courses', icon: 'fa-layer-group' },
  { id: 'programming', label: 'البرمجة وهياكل البيانات', enLabel: 'Programming & Data Structures', icon: 'fa-code' },
  { id: 'systems', label: 'الأنظمة والشبكات', enLabel: 'Systems & Networks', icon: 'fa-server' },
  { id: 'data', label: 'قواعد البيانات وتجربة المستخدم', enLabel: 'Databases & UX', icon: 'fa-database' }
];

export const coursesList = [
  {
    id: 'com_prog',
    code: 'CP-101',
    title: 'برمجة الحاسب',
    enTitle: 'Computer Programming',
    category: 'programming',
    description: 'مفاهيم البرمجة الأساسية، المتغيرات، الدوال، وهياكل التحكم الأولية لبناء أساس برمجي صلب واكتساب التفكير المنطقي.',
    highlights: ['أساسيات لغة البرمجة', 'جمل التحكم والشروط', 'الدوال والمصفوفات'],
    url: 'https://saadalam-077.github.io/com_prog/',
    icon: 'fa-code',
    color: 'emerald',
    badge: 'أساسيات'
  },
  {
    id: 'oop',
    code: 'OOP-201',
    title: 'البرمجة الشيئية',
    enTitle: 'Object-Oriented Programming (OOP)',
    category: 'programming',
    description: 'دروس وتطبيقات عملية حول الفئات (Classes)، الكائنات (Objects)، الوراثة، التغليف، وتعدد الأشكال البرمجية.',
    highlights: ['Classes & Objects', 'الوراثة والتغليف Encapsulation', 'Polymorphism'],
    url: 'https://saadalam-077.github.io/oop/',
    icon: 'fa-cubes',
    color: 'blue',
    badge: 'تطوير متقدم'
  },
  {
    id: 'data_struc',
    code: 'DS-202',
    title: 'هياكل البيانات',
    enTitle: 'Data Structures',
    category: 'programming',
    description: 'أمثلة وأكواد عملية لتنظيم وتخزين البيانات بكفاءة: القوائم المترابطة، المكدسات، الصفوف، الأشجار، والرسوم البيانية.',
    highlights: ['Linked Lists & Stacks', 'Queues & Binary Trees', 'خوارزميات البحث والفرز'],
    url: 'https://saadalam-077.github.io/data_struc/',
    icon: 'fa-network-wired',
    color: 'indigo',
    badge: 'علوم الحاسب'
  },
  {
    id: 'sysadmin',
    code: 'SYS-301',
    title: 'إدارة الأنظمة',
    enTitle: 'System Administration',
    category: 'systems',
    description: 'إدارة السيرفرات، سطر أوامر لينكس (Bash)، إدارة الصلاحيات للمستخدمين، ومراقبة أداء الشبكات والبنية التحتية.',
    highlights: ['Linux CLI & Bash', 'صلاحيات المستخدمين والأمان', 'إدارة خدمات السيرفر'],
    url: 'https://saadalam-077.github.io/sysadmin-course/',
    icon: 'fa-server',
    color: 'amber',
    badge: 'أنظمة التشغيل'
  },
  {
    id: 'database',
    code: 'DB-302',
    title: 'أساسيات قواعد البيانات',
    enTitle: 'Database Fundamentals',
    category: 'data',
    description: 'تصميم النماذج العلائقية (ERD)، كتابة استعلامات SQL المتقدمة، معايير التطبيع (Normalization)، وإدارة البيانات.',
    highlights: ['استعلامات SQL و CRUD', 'تصميم ERD والجداول', 'Normalization والعلاقات'],
    url: 'https://saadalam-077.github.io/database-course/',
    icon: 'fa-database',
    color: 'teal',
    badge: 'إدارة البيانات'
  },
  {
    id: 'hci',
    code: 'HCI-303',
    title: 'تفاعل الإنسان والحاسب',
    enTitle: 'Human-Computer Interaction (HCI)',
    category: 'data',
    description: 'مبادئ تصميم واجهات المستخدم، علم النفس الإدراكي في تجربة المستخدم (UX)، والتقييم الاستدلالي وسهولة الاستخدام.',
    highlights: ['مبادئ تصميم UI/UX', 'التقييم الاستدلالي Heuristics', 'اختبارات قابلية الاستخدام'],
    url: 'https://saadalam-077.github.io/hci/',
    icon: 'fa-hand-pointer',
    color: 'rose',
    badge: 'تصميم و UX'
  },
  {
    id: 'adv_networks',
    code: 'NET-401',
    title: 'موضوعات متقدمة في الشبكات',
    enTitle: 'Advanced Topics in Networks',
    category: 'systems',
    description: 'دراسة هندسة الشبكات الحديثة: SDN و OpenFlow، شبكات 5G Core و MEC، بنية Zero Trust الأمنية، وتقنيات SRv6.',
    highlights: ['SDN & OpenFlow Controller', '5G Core & Zero Trust Security', 'Segment Routing SRv6'],
    url: 'https://saadalam-077.github.io/adv-networks/',
    icon: 'fa-shield-halved',
    color: 'emerald',
    badge: 'شبكات متقدمة'
  }
];
