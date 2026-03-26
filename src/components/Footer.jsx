import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import logoBase64 from '../logoBase64';

const Footer = () => {
  const { t, isRtl, lang, toggleLang } = useLang();

  const navLinks = [
    ['/services', t.nav.services],
    ['/why-us',   t.nav.whyUs],
    ['/contact',  t.nav.contact],
  ];

  const supportLinks = [
    [isRtl ? 'مركز المساعدة'   : 'Help Center',    '#'],
    [isRtl ? 'سياسة الخصوصية' : 'Privacy Policy', '#'],
    [isRtl ? 'الشروط والأحكام' : 'Terms',          '#'],
  ];

  const socials = [
    {
      label: 'Fb', href: 'https://www.facebook.com/profile.php?id=61587278585452',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 10-11.5 9.87v-6.99h-2.7V12h2.7V9.8c0-2.66 1.58-4.13 4-4.13 1.16 0 2.38.2 2.38.2v2.62h-1.34c-1.32 0-1.73.82-1.73 1.66V12h2.94l-.47 2.88h-2.47v6.99A10 10 0 0022 12z"/></svg>,
    },
    {
      label: 'Li', href: 'https://www.linkedin.com/company/zeiia',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
    },
    {
      label: 'Tk', href: 'https://www.tiktok.com/@zeiia98?_r=1&_t=ZS-94widaPqSA8',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.75 2h3.5a5.75 5.75 0 005.75 5.75v3.5a9.25 9.25 0 01-5.75-1.96v6.96a6.5 6.5 0 11-6.5-6.5c.27 0 .53.02.79.06v3.58a3 3 0 103 3V2z"/></svg>,
    },
  ];

  return (
    <footer style={{
      position: 'relative',
      margin: '0 16px 16px',
      borderRadius: 28,
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #0a1020 0%, #0f172a 60%, #121e35 100%)',
    }}>

      {/* ── Blobs ── */}
      <div style={{ position:'absolute', top:'-20%', left:'30%', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle, rgba(201,169,110,.07) 0%, transparent 65%)', filter:'blur(80px)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-10%', right:'5%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(80,110,200,.07) 0%, transparent 65%)', filter:'blur(60px)', pointerEvents:'none' }} />

      {/* ── Golden top border line ── */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,169,110,.5), transparent)' }} />

      <div style={{ padding: '40px 40px 36px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Top grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))',
            gap: 48, marginBottom: 56, paddingBottom: 48,
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}>

            {/* Brand */}
            <div>
              <div style={{ marginBottom: 20 }}>
                <img src={logoBase64} alt="zeiia" style={{ width: 80, height: 80, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: '#94a3b8', maxWidth: 220 }}>{t.footer.desc}</p>

              {/* Socials under brand */}
              <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
                {socials.map(({ label, icon, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    style={{
                      width: 38, height: 38, borderRadius: 12,
                      background: 'rgba(255,255,255,0.06)',
                      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#94a3b8', textDecoration: 'none',
                      transition: 'all .25s', boxShadow: '0 4px 12px rgba(0,0,0,.2)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(201,169,110,0.2)';
                      e.currentTarget.style.borderColor = 'rgba(201,169,110,0.4)';
                      e.currentTarget.style.color = '#C9A96E';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(201,169,110,.2)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.color = '#94a3b8';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,.2)';
                    }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Nav links */}
            <div>
              <h5 style={{ color: '#fff', fontWeight: 800, marginBottom: 24, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {t.companyName}
              </h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, padding: 0, margin: 0 }}>
                {navLinks.map(([to, label]) => (
                  <li key={to}>
                    <Link to={to} style={{ color: '#64748b', textDecoration: 'none', fontSize: 14, transition: 'color .2s', display: 'flex', alignItems: 'center', gap: 6 }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#C9A96E')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
                    >
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(201,169,110,0.5)', flexShrink: 0 }} />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h5 style={{ color: '#fff', fontWeight: 800, marginBottom: 24, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {isRtl ? 'الدعم' : 'Support'}
              </h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, padding: 0, margin: 0 }}>
                {supportLinks.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} style={{ color: '#64748b', textDecoration: 'none', fontSize: 14, transition: 'color .2s', display: 'flex', alignItems: 'center', gap: 6 }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#C9A96E')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
                    >
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(201,169,110,0.5)', flexShrink: 0 }} />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA glass card */}
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 20, padding: '28px 24px',
              boxShadow: '0 8px 32px rgba(0,0,0,.2), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.08 1.18 2 2 0 012.07 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              </div>
              <h5 style={{ color: '#fff', fontWeight: 800, fontSize: 15, marginBottom: 8 }}>
                {isRtl ? 'تواصل معنا' : 'Get in Touch'}
              </h5>
              <p style={{ color: '#64748b', fontSize: 12, lineHeight: 1.7, marginBottom: 20 }}>
                {isRtl ? 'فريقنا جاهز لمساعدتك في أي وقت' : 'Our team is ready to help you anytime'}
              </p>
              <Link to="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '10px 20px', borderRadius: 50,
                background: 'linear-gradient(135deg,#C9A96E,#A8864F)',
                color: '#fff', textDecoration: 'none',
                fontSize: 13, fontWeight: 700,
                boxShadow: '0 8px 20px rgba(201,169,110,.3)',
                transition: 'opacity .2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                {isRtl ? 'ابدأ الآن' : 'Start Now'}
              </Link>
            </div>

          </div>

          {/* Bottom bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, flexWrap: 'wrap', gap: 12 }}>
            <p style={{ color: '#475569', margin: 0 }}>{t.footer.rights}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {['English', 'عربي'].map(l => (
                <span key={l} onClick={toggleLang} style={{
                  cursor: 'pointer', padding: '6px 14px', borderRadius: 50,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#475569', fontSize: 12, fontWeight: 600,
                  transition: 'all .2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#C9A96E'; e.currentTarget.style.borderColor = 'rgba(201,169,110,0.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                >{l}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;