import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, ArrowRight, Cpu, TabletSmartphone, Gem, 
  ShieldCheck, Search, PenTool, CodeXml, Rocket, Zap 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import HeroIllustration from '../components/shared/HeroIllustration';
import useReveal from '../hooks/useReveal';
import countries from '../constants/countries';

/* ── Shared Components ── */
const Tag = ({ children, style = {} }) => (
  <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 16, ...style }}>
    {children}
  </span>
);

const Btn = ({ href, to, primary, children, style = {} }) => {
  const shared = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '14px 32px', borderRadius: 14, fontWeight: 700,
    fontSize: 15, textDecoration: 'none', transition: 'all .2s',
    background: primary ? '#C9A96E' : '#f1f5f9',
    color:      primary ? '#fff'    : '#334155',
    boxShadow:  primary ? '0 8px 24px rgba(201,169,110,.25)' : 'none',
    ...style,
  };
  const enter = e => (e.currentTarget.style.opacity = '0.88');
  const leave = e => (e.currentTarget.style.opacity = '1');
  if (to) return <Link to={to} style={shared} onMouseEnter={enter} onMouseLeave={leave}>{children}</Link>;
  return <a href={href} style={shared} onMouseEnter={enter} onMouseLeave={leave}>{children}</a>;
};

/* ══════════════════════════════════════════════════════════════
   ULTRA LUXURY GOLDEN SHIMMERING STARS (INSTANT SHOW)
══════════════════════════════════════════════════════════════ */
const GoldenDots = () => {
  const dots = useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      coreSize: Math.random() * 2 + 1.5,
      hazeSize: Math.random() * 10 + 8,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      twinkleDuration: Math.random() * 2.5 + 1.5,
      initialOpacity: Math.random() * 0.7 + 0.3,
      glowShadow: `0 0 ${Math.random() * 8 + 4}px rgba(201,169,110,0.9)`
    }));
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
      {dots.map(dot => (
        <motion.div
          key={dot.id}
          initial={{ opacity: dot.initialOpacity, scale: 1 }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: dot.twinkleDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: 'absolute',
            left: dot.left,
            top: dot.top,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* النواة الذهبية */}
          <div style={{
            width: dot.coreSize,
            height: dot.coreSize,
            borderRadius: '50%',
            background: '#C9A96E',
            boxShadow: dot.glowShadow,
            zIndex: 1
          }} />
          
          {/* الهالة المضيئة */}
          <div style={{
            position: 'absolute',
            width: dot.hazeSize,
            height: dot.hazeSize,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,169,110,0.35) 0%, rgba(201,169,110,0.05) 50%, rgba(201,169,110,0) 80%)',
            zIndex: 0
          }} />
        </motion.div>
      ))}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════ */
const HeroSection = () => {
  const { t, isRtl } = useLang();
  return (
    <section style={{ padding: '80px 24px 0px', position: 'relative', overflow: 'hidden', background: '#fff' }}>
      
      <GoldenDots />

      <div style={{
        position: 'absolute', top: 0,
        right: isRtl ? 'auto' : 0, left: isRtl ? 0 : 'auto',
        width: '50%', height: '100%', zIndex: 0,
        background: 'linear-gradient(to left, rgba(248,250,252,0.4), transparent)',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1 }} className="hero-grid">

        <div className="section-animate" style={{ position: 'relative', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)', padding: '24px', borderRadius: 24, boxShadow: '0 8px 32px rgba(201,169,110,0.05)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 50, background: 'rgba(245,237,217,0.7)', backdropFilter: 'blur(4px)', color: '#C9A96E', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 28 }}>
            <span style={{ position: 'relative', width: 8, height: 8 }}>
              <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#C9A96E', opacity: 0.7, animation: 'ping 1.5s cubic-bezier(0,0,.2,1) infinite' }} />
              <span style={{ position: 'relative', display: 'block', width: 8, height: 8, borderRadius: '50%', background: '#A8864F' }} />
            </span>
            {t.hero.badge}
          </div>

          <h1 style={{ fontSize: 'clamp(36px,5vw,68px)', fontWeight: 900, lineHeight: 1.35, marginBottom: 28, color: '#0f172a' }}>
            {t.hero.title}
            <span style={{ color: '#C9A96E' }}>{t.hero.titleAccent}</span>
            {t.hero.titleEnd}
          </h1>

          <p style={{ fontSize: 17, color: '#475569', lineHeight: 1.75, marginBottom: 40, maxWidth: 520 }}>{t.hero.sub}</p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Btn to="/contact" primary>
              {t.hero.cta1}
              {isRtl ? <ArrowRight size={16} strokeWidth={1.5} style={{ transform: 'rotate(180deg)' }} /> : <ChevronRight size={16} strokeWidth={1.5} />}
            </Btn>
            <Btn to="/services">{t.hero.cta2}</Btn>
          </div>
        </div>

        <div className="hero-illustration" style={{ position: 'relative', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)', padding: '24px', borderRadius: 24, boxShadow: '0 8px 32px rgba(201,169,110,0.05)' }}>
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════════════════
   SERVICES PREVIEW
══════════════════════════════════════════════════════════════ */
const ServicesPreview = () => {
  const { t, isRtl } = useLang();
  const ref = useReveal();
  
  const icons = [
    <Cpu size={26} strokeWidth={1.2} />, 
    <TabletSmartphone size={26} strokeWidth={1.2} />, 
    <Gem size={26} strokeWidth={1.2} />
  ];
  const preview = t.services.items.slice(0, 3);

  return (
    <section style={{ padding: '40px 24px 60px', background: '#f8fafc', position: 'relative', overflow: 'hidden' }}>
      
      <GoldenDots />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div ref={ref} className="section-animate">

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <Tag>{t.services.tag}</Tag>
              <h2 style={{ fontSize: 'clamp(24px,3vw,38px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, maxWidth: 500 }}>
                {t.services.title}
              </h2>
            </div>
            <Link
              to="/services"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 50, background: '#0f172a', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 14, transition: 'background .2s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#C9A96E')}
              onMouseLeave={e => (e.currentTarget.style.background = '#0f172a')}
            >
              {isRtl ? 'شوف الكل' : 'View All'}
              {isRtl ? <ArrowRight size={16} strokeWidth={1.5} style={{ transform: 'rotate(180deg)' }} /> : <ArrowRight size={16} strokeWidth={1.5} />}
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: 24 }}>
            {preview.map((s, i) => (
              <div
                key={i}
                style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)', padding: '36px 28px', borderRadius: 20, border: '1px solid #f1f5f9', transition: 'all .4s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'default' }}
                onMouseEnter={e => { 
                  e.currentTarget.style.boxShadow = '0 20px 48px rgba(201,169,110,.12)'; 
                  e.currentTarget.style.borderColor = '#E8D5B0'; 
                  e.currentTarget.style.transform = 'translateY(-6px)'; 
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.boxShadow = 'none'; 
                  e.currentTarget.style.borderColor = '#f1f5f9'; 
                  e.currentTarget.style.transform = 'translateY(0)'; 
                }}
              >
                <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(245,237,217,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9A96E', marginBottom: 24 }}>
                  {icons[i]}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10, color: '#0f172a' }}>{s.title}</h3>
                <p  style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════════════════
   PROCESS SECTION (Ultra Luxury Dark Theme)
══════════════════════════════════════════════════════════════ */
const ProcessSection = () => {
  const { t, isRtl } = useLang();
  
  const stepIcons = [
    <Search size={32} strokeWidth={1} />,   
    <PenTool size={32} strokeWidth={1} />,  
    <CodeXml size={32} strokeWidth={1} />, 
    <Rocket size={32} strokeWidth={1} />,   
  ];

  return (
    <section style={{ padding: '80px 24px', background: '#0f172a', overflow: 'hidden', position: 'relative' }}>
      
      <GoldenDots />

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', background: 'radial-gradient(circle at 50% 0%, rgba(201,169,110,0.08) 0%, rgba(15,23,42,0) 70%)', zIndex: 0 }} />

      <style>{`
        .process-grid-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          position: relative;
        }
        .process-line-mobile { display: none; }
        
        @media (max-width: 1024px) { 
          .process-grid-container {
            grid-template-columns: 1fr;
            gap: 64px;
            max-width: 400px;
            margin: 0 auto;
          }
          .process-line-desktop { display: none !important; } 
          .process-line-mobile { display: block !important; }
        }
        
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 60px' }}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap: 8, marginBottom: 16}}>
             <span style={{ width: 30, height: 1, background: '#C9A96E' }}></span>
             <Tag style={{ marginBottom: 0, letterSpacing: '0.15em' }}>{t.process.tag}</Tag>
             <span style={{ width: 30, height: 1, background: '#C9A96E' }}></span>
          </div>
          
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#fff', lineHeight: 1.2, letterSpacing:'-0.02em' }}>
            {t.process.title}
          </h2>
        </div>

        <div className="process-grid-container">
          
          {/* Desktop Energy Line */}
          <div className="process-line-desktop" style={{ 
            position: 'absolute', top: 50, left: '12%', right: '12%', height: 1, 
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)', zIndex: 0 
          }}>
            <motion.div
              animate={{ left: isRtl ? ['100%', '0%'] : ['0%', '100%'], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: 'absolute', top: -1, width: 80, height: 3,
                background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
                boxShadow: '0 0 12px rgba(201,169,110,0.8)',
                borderRadius: '50%'
              }}
            />
          </div>

          {/* Mobile Energy Line */}
          <div className="process-line-mobile" style={{ 
            position: 'absolute', top: 50, bottom: 50, left: '50%', width: 1, 
            transform: 'translateX(-50%)',
            background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.1), transparent)', zIndex: 0 
          }}>
            <motion.div
              animate={{ top: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: 'absolute', left: -1, height: 80, width: 3,
                background: 'linear-gradient(180deg, transparent, #C9A96E, transparent)',
                boxShadow: '0 0 12px rgba(201,169,110,0.8)',
                borderRadius: '50%'
              }}
            />
          </div>

          {t.process.steps.map((step, i) => (
            <motion.div 
              key={i} 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 12px', position: 'relative', zIndex: 1 }}
            >
              
              <div style={{ fontSize: 13, fontWeight: 800, color: '#C9A96E', marginBottom: 24, letterSpacing: '0.1em', fontFamily: 'sans-serif', background: '#0f172a', padding: '0 12px', zIndex: 2 }}>
                0{i + 1}
              </div>

              <motion.div 
                className="step-circle" 
                animate={{ 
                  boxShadow: [
                    '0px 10px 30px rgba(0,0,0,0.2)', 
                    '0px 15px 40px rgba(201,169,110,0.15)', 
                    '0px 10px 30px rgba(0,0,0,0.2)'
                  ] 
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                style={{
                  width: 100, height: 100, borderRadius: '50%',
                  background: '#1e293b', 
                  color: i % 2 === 0 ? '#fff' : '#C9A96E',
                  border: '1px solid rgba(201,169,110,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 32,
                  position: 'relative', zIndex: 2
                }}
              >
                <div style={{ position: 'absolute', inset: 4, borderRadius: '50%', border: '1px dashed rgba(201,169,110,0.2)', animation: 'spin 20s linear infinite' }} />
                {stepIcons[i]}
              </motion.div>

              <h3 style={{ fontSize: 19, fontWeight: 800, marginBottom: 14, color: '#fff', letterSpacing:'-0.01em', background: '#0f172a', padding: '0 12px', zIndex: 2 }}>
                {step.title}
              </h3>
              <p style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.8, maxWidth: 260, background: '#0f172a', padding: '0 12px', zIndex: 2 }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════════════════
   STANDALONE CHIC FORM (ABOVE FOOTER)
══════════════════════════════════════════════════════════════ */
const QuickContactSection = () => {
  const { t, isRtl } = useLang();
  const ref = useReveal();

  const [formStatus,   setFormStatus]   = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formData,     setFormData]     = useState({
    name: '', email: '', phone: '', countryCode: '+20', message: '',
  });

  useEffect(() => {
    const handler = e => { if (!e.target.closest('.country-dropdown')) setDropdownOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const map = { EG:'+20', SA:'+966', AE:'+971', KW:'+965', QA:'+974', BH:'+973', OM:'+968', JO:'+962', LB:'+961', GB:'+44', US:'+1' };
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(d => { if (map[d.country_code]) setFormData(p => ({ ...p, countryCode: map[d.country_code] })); })
      .catch(() => {});
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name:'', email:'', phone:'', countryCode:'+20', message:'' });
    }, 1500);
  };

  const selectedCountry = countries.find(c => c.code === formData.countryCode);

  return (
    <section id="quick-contact" style={{ padding: '60px 24px', background: '#f8fafc', position: 'relative', overflow: 'hidden' }}>
      
      <GoldenDots />

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to bottom, #F5EDD9 0%, #f8fafc 100%)', opacity: 0.6, zIndex: 0 }} />
      
      <div style={{ maxWidth: 840, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div ref={ref} className="section-animate">
          
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Tag>{isRtl ? 'دعنا نتحدث' : 'Let\'s Talk'}</Tag>
            <h2 style={{ fontSize: 'clamp(28px,3vw,42px)', fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>
              {isRtl ? 'جاهز تبدأ مشروعك؟' : 'Ready to start your project?'}
            </h2>
            <p style={{ color: '#64748b', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
              {isRtl ? 'سجل بياناتك وسنقوم بالتواصل معك في أقرب وقت لبدء رحلة نجاحك.' : 'Drop your details below and our team will get back to you shortly.'}
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)', padding: 'clamp(32px, 5vw, 56px)', borderRadius: 32, boxShadow: '0 40px 80px rgba(201,169,110,0.1)', border: '1px solid #f1f5f9' }}>
            {formStatus === 'success' ? (
              <div style={{ minHeight: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#f0fdf4', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, boxShadow: '0 8px 24px rgba(34,197,94,.2)' }}>
                  <ShieldCheck size={40} strokeWidth={1.5} />
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, color: '#0f172a' }}>{t.contact.success}</h3>
                <p style={{ color: '#64748b', fontSize: 16 }}>{t.contact.successSub}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                  {[
                    { key: 'name',  label: t.contact.formName,  type: 'text',  placeholder: isRtl ? 'محمد أحمد' : 'John Doe',
                      onChange: v => /^[\u0600-\u06FFa-zA-Z\s]*$/.test(v) && setFormData(p => ({ ...p, name: v })) },
                    { key: 'email', label: t.contact.formEmail, type: 'email', placeholder: 'hello@example.com',
                      onChange: v => setFormData(p => ({ ...p, email: v })) },
                  ].map(({ key, label, type, placeholder, onChange }) => (
                    <div key={key}>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 8 }}>{label}</label>
                      <input
                        required type={type} placeholder={placeholder} value={formData[key]}
                        onChange={e => onChange(e.target.value)}
                        style={{ width: '100%', padding: '16px 20px', borderRadius: 16, border: '1.5px solid #e2e8f0', background: 'rgba(248,250,252,0.7)',backdropFilter: 'blur(4px)', fontSize: 14, fontFamily: 'Tajawal,sans-serif', outline: 'none', transition: 'all .2s', boxSizing: 'border-box' }}
                        onFocus={e => { e.target.style.borderColor = '#C9A96E'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 4px rgba(201,169,110,.1)'; }}
                        onBlur={e  => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = 'rgba(248,250,252,0.7)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 8 }}>
                    {isRtl ? 'رقم الهاتف' : 'Phone Number'}
                  </label>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div className="country-dropdown" style={{ position: 'relative', flexShrink: 0 }}>
                      <div
                        onClick={() => setDropdownOpen(o => !o)}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '16px 14px', borderRadius: 16, minWidth: 120, border: '1.5px solid #e2e8f0', background: 'rgba(248,250,252,0.7)',backdropFilter: 'blur(4px)', cursor: 'pointer', fontSize: 14, fontFamily: 'Tajawal,sans-serif', userSelect: 'none', transition: 'all .2s' }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = '#e2e8f0'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = '#f1f5f9'}
                      >
                        <img src={`https://flagcdn.com/w20/${selectedCountry?.iso}.png`} width="20" height="14" style={{ borderRadius: 2, objectFit: 'cover', flexShrink: 0 }} />
                        <span style={{ color: '#0f172a', fontWeight: 600 }}>{formData.countryCode}</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginInlineStart: 'auto', color: '#94a3b8', transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
                          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      {dropdownOpen && (
                        <div style={{ position: 'absolute', top: '110%', left: 0, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, boxShadow: '0 20px 48px rgba(0,0,0,.1)', zIndex: 100, maxHeight: 220, overflowY: 'auto', minWidth: 170 }}>
                          {countries.map(c => (
                            <div
                              key={c.code}
                              onClick={() => { setFormData(p => ({ ...p, countryCode: c.code })); setDropdownOpen(false); }}
                              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', cursor: 'pointer', fontSize: 13, fontFamily: 'Tajawal,sans-serif', background: formData.countryCode === c.code ? '#F5EDD9' : 'transparent', color: formData.countryCode === c.code ? '#C9A96E' : '#334155', transition: 'background .2s' }}
                              onMouseEnter={e => { if (formData.countryCode !== c.code) e.currentTarget.style.background = '#f8fafc'; }}
                              onMouseLeave={e => { if (formData.countryCode !== c.code) e.currentTarget.style.background = 'transparent'; }}
                            >
                              <img src={`https://flagcdn.com/w20/${c.iso}.png`} width="20" height="14" style={{ borderRadius: 2, objectFit: 'cover', flexShrink: 0 }} />
                              <span style={{ fontWeight: 600, color: '#64748b', minWidth: 38 }}>{c.code}</span>
                              <span>{c.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <input
                      required type="tel" dir="ltr"
                      placeholder={selectedCountry?.placeholder || '000 000 0000'}
                      value={formData.phone}
                      onChange={e => { const v = e.target.value; if (/^[0-9\s]*$/.test(v)) setFormData(p => ({ ...p, phone: v })); }}
                      style={{ flex: 1, padding: '16px 20px', borderRadius: 16, border: '1.5px solid #e2e8f0', background: 'rgba(248,250,252,0.7)',backdropFilter: 'blur(4px)', fontSize: 14, fontFamily: 'Tajawal,sans-serif', outline: 'none', transition: 'all .2s', boxSizing: 'border-box' }}
                      onFocus={e => { e.target.style.borderColor = '#C9A96E'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 4px rgba(201,169,110,.1)'; }}
                      onBlur={e  => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = 'rgba(248,250,252,0.7)'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 8 }}>{t.contact.formMsg}</label>
                  <textarea
                    required rows={4} placeholder={isRtl ? 'اكتب تفاصيل مشروعك أو استفسارك هنا...' : 'Tell us about your project or inquiry...'}
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    style={{ width: '100%', padding: '16px 20px', borderRadius: 16, border: '1.5px solid #e2e8f0', background: 'rgba(248,250,252,0.7)',backdropFilter: 'blur(4px)', fontSize: 14, fontFamily: 'Tajawal,sans-serif', outline: 'none', resize: 'none', transition: 'all .2s', boxSizing: 'border-box' }}
                    onFocus={e => { e.target.style.borderColor = '#C9A96E'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 4px rgba(201,169,110,.1)'; }}
                    onBlur={e  => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = 'rgba(248,250,252,0.7)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>

                <button
                  type="submit"
                  style={{ padding: '18px 24px', background: formStatus === 'sending' ? '#64748b' : '#0f172a', color: '#fff', borderRadius: 16, fontWeight: 800, fontSize: 15, border: 'none', cursor: formStatus === 'sending' ? 'wait' : 'pointer', fontFamily: 'Tajawal,sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all .3s', boxShadow: '0 8px 24px rgba(15,23,42,.15)', marginTop: 8 }}
                  disabled={formStatus === 'sending'}
                  onMouseEnter={e => { if (formStatus !== 'sending') { e.currentTarget.style.background = '#C9A96E'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(201,169,110,.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
                  onMouseLeave={e => { if (formStatus !== 'sending') { e.currentTarget.style.background = '#0f172a'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,23,42,.15)'; e.currentTarget.style.transform = 'translateY(0)'; } }}
                >
                  {formStatus === 'sending' ? (isRtl ? 'جاري الإرسال...' : 'Sending...') : (isRtl ? 'إرسال طلب استشارة' : 'Send Consultation Request')}
                  {formStatus !== 'sending' && <ArrowRight size={18} strokeWidth={1.5} style={{ transform: isRtl ? 'rotate(180deg)' : 'none' }} />}
                </button>

              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
const HomePage = () => (
  <>
    <HeroSection />
    <ServicesPreview />
    <ProcessSection />
    <QuickContactSection />
  </>
);

export default HomePage;