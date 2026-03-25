# zeiia — React Router Migration

## هيكل الملفات الجديد

```
src/
├── App.jsx                          ← Router + Layout + IntroScreen
├── index.css                        ← كل الـ animations والـ responsive
│
├── context/
│   └── LangContext.jsx              ← lang state + useLang() hook
│
├── data/
│   └── translations.js              ← كل النصوص EN/AR
│
├── constants/
│   └── countries.js                 ← قائمة الدول ورموز الهاتف
│
├── hooks/
│   └── useReveal.js                 ← IntersectionObserver للـ animations
│
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── IntroScreen.jsx              ← شاشة الـ intro المنفصلة
│   └── shared/
│       ├── index.jsx                ← Tag, Btn, Section
│       └── HeroIllustration.jsx
│
└── pages/
    ├── HomePage.jsx                 ← /
    ├── ServicesPage.jsx             ← /services
    ├── WhyUsPage.jsx                ← /why-us
    └── ContactPage.jsx              ← /contact
```

## Routes

| Path         | Component       |
|--------------|-----------------|
| `/`          | HomePage        |
| `/services`  | ServicesPage    |
| `/why-us`    | WhyUsPage       |
| `/contact`   | ContactPage     |

## كيف تستخدم useLang

```jsx
import { useLang } from '../context/LangContext';

const MyComponent = () => {
  const { t, isRtl, lang, toggleLang } = useLang();
  // t         → كل الترجمات للغة الحالية
  // isRtl     → true إذا اللغة عربي
  // lang      → 'ar' | 'en'
  // toggleLang → بتغير اللغة
};
```

## ملاحظات مهمة

1. **`logoBase64`** — لسه بتستخدم `import logoBase64 from '../logoBase64'` في Footer.jsx. تأكد الملف موجود.
2. **`react-router-dom`** — لازم تكون مثبتة: `npm install react-router-dom`
3. **`index.css`** — مستوردة في `App.jsx`. لو عندك ملف CSS تاني دمّجهم.
4. **Scroll to top** — لو محتاج الصفحة ترجع للأعلى عند التنقل بين الروابط، أضف:

```jsx
// في App.jsx بعد useEffect الـ intro
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// وضيف <ScrollToTop /> جوا <AppRoutes> قبل <Layout>
```
