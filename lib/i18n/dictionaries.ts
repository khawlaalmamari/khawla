import type { Locale } from "./config";

export type Dictionary = typeof ar;

export const ar = {
  meta: {
    siteName: "E-nursing",
    tagline: "From Knowledge to Clinical Thinking",
    taglineAr: "من المعرفة إلى التفكير السريري",
  },
  nav: {
    home: "الرئيسية",
    anatomy: "التشريح",
    physiology: "علم وظائف الأعضاء",
    studyPlanner: "خطة المذاكرة",
    dashboard: "لوحة التحكم",
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    logout: "تسجيل الخروج",
    profile: "الملف الشخصي",
  },
  landing: {
    heroDescription:
      "مرحبًا بك في E-nursing، منصتك التعليمية الطبية الذكية المصممة خصيصًا لدعم طلاب التمريض في السنة الأولى بسلطنة عُمان.\n\nهنا، تتحول دراسة جسم الإنسان من مجرد معلومات للحفظ إلى رحلة تفاعلية لاكتشاف أسرار التشريح وفهم وظائف الأعضاء، من خلال شروحات علمية مبسطة، ومجسمات ثلاثية الأبعاد، واختبارات ذكية، وحالات سريرية تساعدك على ربط المعرفة الطبية بالتفكير السريري.\n\nمع E-nursing، يمكنك تنظيم مذاكرتك، والتدرّب على الأسئلة، واكتشاف نقاط قوتك، وتطوير مستواك الأكاديمي خطوة بخطوة، بمساعدة مدرّسك الذكي «اسأل نوفيا» الذي يرافقك في رحلة التعلّم ويبسّط لك المفاهيم الصعبة بالعربية والإنجليزية.\n\nلا تكتفِ بحفظ المعلومة، بل افهمها، واربطها، وتعلّم كيف تفكّر كممرض المستقبل.\nرحلتك نحو التميّز في التمريض تبدأ من هنا.",
    heroShort:
      "E-nursing — افهم جسم الإنسان، وطوّر تفكيرك السريري، واصنع مستقبلك في التمريض.",
    ctaStart: "ابدأ رحلتك التعليمية",
    ctaExplore: "استكشف المنصة",
    discoverTitle: "اكتشف تجربة التعلّم",
    howItWorksTitle: "كيف تعمل المنصة؟",
    features: [
      {
        icon: "🧠",
        title: "تعلّم بفهم، لا بالحفظ فقط",
        body:
          "استكشف مادتي التشريح وعلم وظائف الأعضاء من خلال دروس منظمة وشروحات علمية مبسطة تساعدك على فهم جسم الإنسان وربط أجهزته ووظائفه.",
      },
      {
        icon: "🫀",
        title: "استكشف جسم الإنسان ثلاثي الأبعاد",
        body:
          "اقترب من تفاصيل جسم الإنسان من خلال مجسمات تفاعلية تتيح لك استكشاف الأعضاء والأجهزة وفهم مواقعها وتركيبها بطريقة بصرية ممتعة.",
      },
      {
        icon: "🩺",
        title: "طوّر تفكيرك السريري",
        body:
          "انتقل من المعرفة النظرية إلى التطبيق من خلال أسئلة تدريبية وحالات سريرية تعليمية تساعدك على التحليل والاستنتاج وربط المفاهيم الطبية بالمواقف التمريضية.",
      },
      {
        icon: "📚",
        title: "خطتك الدراسية، بطريقتك",
        body:
          "نظّم مذاكرتك لكل مادة، وحدّد أهدافك اليومية، وتابع إنجاز الموديلات والدروس، واستعد لامتحاناتك وفق خطة تناسب احتياجاتك.",
      },
      {
        icon: "🤖",
        title: "اسأل نوفيا، وتعلّم بثقة",
        body:
          "مساعدك التعليمي الذكي الذي يساعدك على فهم المفاهيم الصعبة، وتبسيط المصطلحات الطبية، ومراجعة الدروس والتدرّب على الأسئلة بالعربية والإنجليزية.",
      },
      {
        icon: "📊",
        title: "تقدّمك أمام عينيك",
        body:
          "تابع ساعات مذاكرتك، ونتائج اختباراتك، ونسبة إنجازك، واكتشف الموضوعات التي تحتاج إلى مزيد من المراجعة من خلال لوحة تحكم تفاعلية.",
      },
    ],
    steps: [
      "أنشئ حسابك وحدّد أهدافك الدراسية.",
      "اختر المادة والموديل الذي تريد دراسته.",
      "تعلّم واستكشف المفاهيم الطبية وتدرّب على الأسئلة.",
      "اجتز الاختبار، وتابع تقدمك، وانتقل إلى الموديل التالي.",
    ],
  },
  auth: {
    loginTitle: "تسجيل الدخول",
    loginSubtitle:
      "مستقبلك في التمريض يبدأ بفهمك اليوم.\nاكتشف تجربة تعليمية طبية تجمع بين المعرفة، والتفاعل، والتفكير السريري.\nادرس التشريح والفسيولوجيا، واستكشف جسم الإنسان ثلاثي الأبعاد، واختبر معلوماتك، وتابع تقدمك الأكاديمي من خلال منصة صُممت لتجعل رحلتك التعليمية أكثر وضوحًا وتنظيمًا وفاعلية.\nتعلّم. استكشف. تدرب. وتقدّم بثقة مع E-nursing.",
    identifierLabel: "اسم المستخدم أو البريد الإلكتروني",
    passwordLabel: "كلمة المرور",
    showPassword: "إظهار كلمة المرور",
    hidePassword: "إخفاء كلمة المرور",
    forgotPassword: "نسيت كلمة المرور؟",
    loginButton: "تسجيل الدخول",
    noAccount: "ليس لديك حساب؟",
    createAccount: "إنشاء حساب جديد",
    signupTitle: "إنشاء حساب جديد",
    fullNameLabel: "الاسم الكامل",
    usernameLabel: "اسم المستخدم",
    emailLabel: "البريد الإلكتروني",
    confirmPasswordLabel: "تأكيد كلمة المرور",
    signupButton: "إنشاء الحساب",
    haveAccount: "لديك حساب بالفعل؟",
    forgotTitle: "استعادة كلمة المرور",
    forgotSubtitle:
      "أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور.",
    sendResetLink: "إرسال رابط الاستعادة",
    backToLogin: "الرجوع إلى تسجيل الدخول",
    errors: {
      invalidCredentials: "اسم المستخدم/البريد الإلكتروني أو كلمة المرور غير صحيحة.",
      accountLocked:
        "تم تعليق الحساب مؤقتًا بسبب محاولات دخول فاشلة متكررة. يرجى المحاولة بعد {minutes} دقيقة.",
      emailTaken: "هذا البريد الإلكتروني مستخدم بالفعل.",
      usernameTaken: "اسم المستخدم هذا مستخدم بالفعل.",
      passwordMismatch: "كلمتا المرور غير متطابقتين.",
      weakPassword: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.",
      genericError: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
      required: "هذا الحقل مطلوب.",
      invalidEmail: "صيغة البريد الإلكتروني غير صحيحة.",
    },
    successResetRequested:
      "إذا كان هذا البريد الإلكتروني مسجلاً لدينا، فستصلك رسالة تحتوي على رابط الاستعادة قريبًا.",
  },
  dashboard: {
    welcome: "مرحبًا بك، {name}",
    overallProgress: "نسبة الإنجاز الأكاديمي",
    anatomyProgress: "تقدم التشريح",
    physiologyProgress: "تقدم علم وظائف الأعضاء",
    completedModules: "الموديلات المكتملة",
    recentQuizzes: "الاختبارات الأخيرة",
    averageScore: "متوسط الدرجات",
    dailyPlan: "خطة المذاكرة اليومية",
    upcomingTasks: "المهام القادمة",
    reviewTopics: "موضوعات تحتاج إلى مراجعة",
    noAttemptsYet: "لم تقم بأي اختبار بعد.",
    noReviewNeeded: "لا توجد موضوعات تحتاج إلى مراجعة حاليًا. أحسنت!",
    continueLearning: "استمر في التعلّم",
  },
  course: {
    modules: "الموديلات",
    lessons: "الدروس",
    startModule: "ابدأ الموديل",
    continueModule: "استمر في الموديل",
    reviewModule: "أعد مراجعة الموديل",
    completed: "مكتمل",
    inProgress: "قيد التنفيذ",
    notStarted: "لم يبدأ",
    objectives: "الأهداف التعليمية",
    keyTerms: "المصطلحات الطبية",
    summary: "ملخص الدرس",
    references: "المراجع العلمية",
    takeQuiz: "ابدأ الاختبار القصير",
    backToModule: "الرجوع إلى الموديل",
  },
  quiz: {
    question: "السؤال",
    of: "من",
    submit: "إرسال الإجابات",
    next: "التالي",
    previous: "السابق",
    resultsTitle: "نتيجة الاختبار",
    passed: "لقد نجحت في هذا الموديل!",
    failed: "لم تصل إلى درجة النجاح المطلوبة. راجع الدرس وحاول مرة أخرى.",
    yourScore: "درجتك",
    correctAnswer: "الإجابة الصحيحة",
    yourAnswer: "إجابتك",
    explanation: "التفسير العلمي",
    retakeQuiz: "إعادة الاختبار",
    goToLesson: "الانتقال إلى الدرس",
  },
  novia: {
    widgetTitle: "اسأل نوفيا",
    placeholder: "اكتب سؤالك هنا...",
    send: "إرسال",
    disclaimer: "نوفيا أداة تعليمية مساعدة، وليست بديلاً عن معلمك أو أي ممارس صحي.",
    notConfigured:
      "مساعد نوفيا الذكي غير مُفعّل حاليًا لأن مزوّد الذكاء الاصطناعي لم يتم ربطه بعد. يرجى إضافة مفتاح API في إعدادات المنصة.",
    thinking: "نوفيا تفكّر...",
    errorGeneric: "حدث خطأ أثناء التواصل مع نوفيا. حاول مرة أخرى.",
  },
  common: {
    loading: "جارٍ التحميل...",
    error: "حدث خطأ",
    save: "حفظ",
    cancel: "إلغاء",
    language: "اللغة",
    arabic: "العربية",
    english: "English",
  },
};

export const en: Dictionary = {
  meta: {
    siteName: "E-nursing",
    tagline: "From Knowledge to Clinical Thinking",
    taglineAr: "From Knowledge to Clinical Thinking",
  },
  nav: {
    home: "Home",
    anatomy: "Anatomy",
    physiology: "Physiology",
    studyPlanner: "Study Planner",
    dashboard: "Dashboard",
    login: "Log In",
    signup: "Sign Up",
    logout: "Log Out",
    profile: "Profile",
  },
  landing: {
    heroDescription:
      "Welcome to E-nursing, your smart medical learning platform built specifically to support first-year nursing students in the Sultanate of Oman.\n\nHere, studying the human body turns from rote memorization into an interactive journey of discovering the secrets of anatomy and understanding how organs function — through simplified scientific explanations, interactive 3D models, smart quizzes, and clinical cases that help you connect medical knowledge to clinical thinking.\n\nWith E-nursing, you can organize your study time, practice with questions, discover your strengths, and build your academic level step by step, guided by your smart tutor \"Ask Novia\", who walks with you through your learning journey and simplifies difficult concepts in both Arabic and English.\n\nDon't just memorize information — understand it, connect it, and learn how to think like the nurse of the future.\nYour journey toward excellence in nursing starts here.",
    heroShort:
      "E-nursing — Understand the human body, build your clinical thinking, and shape your future in nursing.",
    ctaStart: "Start Your Learning Journey",
    ctaExplore: "Explore the Platform",
    discoverTitle: "Discover the Learning Experience",
    howItWorksTitle: "How Does the Platform Work?",
    features: [
      {
        icon: "🧠",
        title: "Learn to Understand, Not Just Memorize",
        body:
          "Explore Anatomy and Physiology through structured lessons and simplified scientific explanations that help you understand the human body and connect its systems and functions.",
      },
      {
        icon: "🫀",
        title: "Explore the Human Body in 3D",
        body:
          "Get close to the details of the human body through interactive models that let you explore organs and systems and understand their location and structure in an enjoyable visual way.",
      },
      {
        icon: "🩺",
        title: "Build Your Clinical Thinking",
        body:
          "Move from theoretical knowledge to application through practice questions and educational clinical cases that help you analyze, reason, and connect medical concepts to nursing situations.",
      },
      {
        icon: "📚",
        title: "Your Study Plan, Your Way",
        body:
          "Organize your studying for each subject, set your daily goals, track completed modules and lessons, and prepare for your exams with a plan that fits your needs.",
      },
      {
        icon: "🤖",
        title: "Ask Novia, Learn with Confidence",
        body:
          "Your smart learning assistant helps you understand difficult concepts, simplify medical terminology, review lessons, and practice questions in both Arabic and English.",
      },
      {
        icon: "📊",
        title: "Your Progress, Right in Front of You",
        body:
          "Track your study hours, quiz results, and completion rate, and discover topics that need more review through an interactive dashboard.",
      },
    ],
    steps: [
      "Create your account and set your study goals.",
      "Choose the subject and module you want to study.",
      "Learn and explore medical concepts, and practice questions.",
      "Pass the quiz, track your progress, and move to the next module.",
    ],
  },
  auth: {
    loginTitle: "Log In",
    loginSubtitle:
      "Your future in nursing starts with understanding today.\nDiscover a medical learning experience that combines knowledge, interactivity, and clinical thinking.\nStudy anatomy and physiology, explore the human body in 3D, test your knowledge, and track your academic progress on a platform designed to make your learning journey clearer, more organized, and more effective.\nLearn. Explore. Practice. And progress with confidence with E-nursing.",
    identifierLabel: "Username or Email",
    passwordLabel: "Password",
    showPassword: "Show password",
    hidePassword: "Hide password",
    forgotPassword: "Forgot password?",
    loginButton: "Log In",
    noAccount: "Don't have an account?",
    createAccount: "Create a new account",
    signupTitle: "Create a New Account",
    fullNameLabel: "Full Name",
    usernameLabel: "Username",
    emailLabel: "Email",
    confirmPasswordLabel: "Confirm Password",
    signupButton: "Create Account",
    haveAccount: "Already have an account?",
    forgotTitle: "Reset Password",
    forgotSubtitle:
      "Enter your email and we'll send you a link to reset your password.",
    sendResetLink: "Send Reset Link",
    backToLogin: "Back to Log In",
    errors: {
      invalidCredentials: "Incorrect username/email or password.",
      accountLocked:
        "This account is temporarily locked due to repeated failed login attempts. Please try again in {minutes} minute(s).",
      emailTaken: "This email is already in use.",
      usernameTaken: "This username is already taken.",
      passwordMismatch: "Passwords do not match.",
      weakPassword: "Password must be at least 8 characters long.",
      genericError: "Something went wrong. Please try again.",
      required: "This field is required.",
      invalidEmail: "Invalid email format.",
    },
    successResetRequested:
      "If this email is registered with us, you'll receive a reset link shortly.",
  },
  dashboard: {
    welcome: "Welcome, {name}",
    overallProgress: "Overall Academic Progress",
    anatomyProgress: "Anatomy Progress",
    physiologyProgress: "Physiology Progress",
    completedModules: "Completed Modules",
    recentQuizzes: "Recent Quizzes",
    averageScore: "Average Score",
    dailyPlan: "Daily Study Plan",
    upcomingTasks: "Upcoming Tasks",
    reviewTopics: "Topics That Need Review",
    noAttemptsYet: "You haven't taken any quizzes yet.",
    noReviewNeeded: "No topics need review right now. Great job!",
    continueLearning: "Continue Learning",
  },
  course: {
    modules: "Modules",
    lessons: "Lessons",
    startModule: "Start Module",
    continueModule: "Continue Module",
    reviewModule: "Review Module",
    completed: "Completed",
    inProgress: "In Progress",
    notStarted: "Not Started",
    objectives: "Learning Objectives",
    keyTerms: "Medical Terminology",
    summary: "Lesson Summary",
    references: "Scientific References",
    takeQuiz: "Take the Quiz",
    backToModule: "Back to Module",
  },
  quiz: {
    question: "Question",
    of: "of",
    submit: "Submit Answers",
    next: "Next",
    previous: "Previous",
    resultsTitle: "Quiz Results",
    passed: "You passed this module!",
    failed: "You didn't reach the required passing score. Review the lesson and try again.",
    yourScore: "Your Score",
    correctAnswer: "Correct Answer",
    yourAnswer: "Your Answer",
    explanation: "Explanation",
    retakeQuiz: "Retake Quiz",
    goToLesson: "Go to Lesson",
  },
  novia: {
    widgetTitle: "Ask Novia",
    placeholder: "Type your question here...",
    send: "Send",
    disclaimer: "Novia is a learning aid, not a substitute for your instructor or a healthcare professional.",
    notConfigured:
      "The Novia AI tutor isn't active yet because no AI provider has been connected. Please add an API key in the platform settings.",
    thinking: "Novia is thinking...",
    errorGeneric: "Something went wrong while contacting Novia. Please try again.",
  },
  common: {
    loading: "Loading...",
    error: "An error occurred",
    save: "Save",
    cancel: "Cancel",
    language: "Language",
    arabic: "العربية",
    english: "English",
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return locale === "ar" ? ar : en;
}
