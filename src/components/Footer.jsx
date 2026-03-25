import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import logoBase64 from '../logoBase64';   // ← نفس الـ import الأصلي

const Footer = () => {
  const { t, isRtl, lang, toggleLang } = useLang();

  const navLinks = [
    ['/services', t.nav.services],
    ['/why-us',   t.nav.whyUs],
    ['/contact',  t.nav.contact],
  ];

  const supportLinks = [
    [isRtl ? 'مركز المساعدة'      : 'Help Center',    '#'],
    [isRtl ? 'سياسة الخصوصية'     : 'Privacy Policy', '#'],
    [isRtl ? 'الشروط والأحكام'    : 'Terms',          '#'],
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
      background: '#0f172a', color: '#94a3b8',
      padding: '80px 24px 40px',
      borderRadius: '24px 24px 0 0', margin: '0 16px',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Top grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))',
          gap: 48, marginBottom: 56, paddingBottom: 48, borderBottom: '1px solid #1e293b',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <img src={logoBase64} alt="zeiia" style={{ width: 80, height: 80, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7 }}>{t.footer.desc}</p>
          </div>

          {/* Nav links */}
          <div>
            <h5 style={{ color: '#fff', fontWeight: 800, marginBottom: 24, fontSize: 15 }}>{t.companyName}</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {navLinks.map(([to, label]) => (
                <li key={to}>
                  <Link to={to} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: 13, transition: 'color .2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#C9A96E')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
                  >{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 style={{ color: '#fff', fontWeight: 800, marginBottom: 24, fontSize: 15 }}>{isRtl ? 'الدعم' : 'Support'}</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {supportLinks.map(([label, href]) => (
                <li key={label}>
                  <a href={href} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: 13, transition: 'color .2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#C9A96E')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
                  >{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h5 style={{ color: '#fff', fontWeight: 800, marginBottom: 24, fontSize: 15 }}>{isRtl ? 'التواصل الاجتماعي' : 'Social'}</h5>
            <div style={{ display: 'flex', gap: 12 }}>
              {socials.map(({ label, icon, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ width: 40, height: 40, borderRadius: '50%', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#94a3b8', transition: 'all .2s', textDecoration: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#C9A96E'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#1e293b'; e.currentTarget.style.color = '#94a3b8'; }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, flexWrap: 'wrap', gap: 12 }}>
          <p>{t.footer.rights}</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['English', 'عربي'].map(l => (
              <span key={l} onClick={toggleLang} style={{ cursor: 'pointer', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
              >{l}</span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
