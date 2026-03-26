import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, Menu, X } from 'lucide-react';
import { useLang } from './context/LangContext';

const Navbar = () => {
  const { t, lang, isRtl, toggleLang } = useLang();
  const [isMenuOpen, setIsMenuOpen]     = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    ['/services', t.nav.services],
    ['/why-us',   t.nav.whyUs],
  ];

  return (
    <nav style={{
      position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)',
      width: 'calc(100% - 48px)', maxWidth: 1280, zIndex: 50,
    }}>
      {/* ── Inner bar ── */}
      <div style={{
        padding: '0 24px', height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.45)',
        borderRadius: 20,
        boxShadow: '0 8px 32px rgba(201,169,110,0.10), inset 0 1px 0 rgba(255,255,255,0.6)',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo-dark.PNG" alt="zeiia logo" style={{ width: 120, height: 120, objectFit: 'contain' }} />
        </Link>

        {/* Desktop links */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 32, fontWeight: 600, fontSize: 14 }}>
          {navLinks.map(([to, label]) => (
            <Link
              key={to} to={to}
              style={{ color: '#475569', textDecoration: 'none', transition: 'color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#C9A96E')}
              onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
            >
              {label}
            </Link>
          ))}

          {/* Lang toggle */}
          <button onClick={toggleLang} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px',
            borderRadius: 10, border: '1px solid rgba(255,255,255,0.45)',
            background: 'rgba(255,255,255,0.3)',
            backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#475569',
            fontFamily: 'Cairo, sans-serif',
          }}>
            <Globe size={14} /> {lang === 'ar' ? 'English' : 'عربي'}
          </button>

          {/* CTA */}
          <Link to="/contact" style={{
            padding: '10px 24px', background: '#0f172a', color: '#fff',
            borderRadius: 50, textDecoration: 'none', fontWeight: 700, fontSize: 13,
            transition: 'background .2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = '#C9A96E')}
            onMouseLeave={e => (e.currentTarget.style.background = '#0f172a')}
          >
            {t.nav.contact}
          </Link>
        </div>

        {/* Mobile icons */}
        <div className="mobile-nav" style={{ display: 'flex', gap: 8 }}>
          <button onClick={toggleLang} style={{
            padding: 8, borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.45)',
            background: 'rgba(255,255,255,0.3)',
            backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            cursor: 'pointer', color: '#475569',
          }}>
            <Globe size={18} />
          </button>
          <button onClick={() => setIsMenuOpen(o => !o)} style={{
            padding: 8, border: 'none', background: 'none', cursor: 'pointer', color: '#0f172a',
          }}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div style={{
          marginTop: 12,
          background: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.45)',
          borderRadius: 20,
          boxShadow: '0 8px 32px rgba(201,169,110,0.10)',
          padding: '24px',
          display: 'flex', flexDirection: 'column', gap: 20,
        }}>
          {[...navLinks, ['/contact', t.nav.contact]].map(([to, label], i, arr) => (
            <Link
              key={to} to={to}
              onClick={() => setIsMenuOpen(false)}
              style={{
                fontSize: 20, fontWeight: 800, textDecoration: 'none',
                color: i === arr.length - 1 ? '#C9A96E' : '#0f172a',
                paddingBottom: i < arr.length - 1 ? 16 : 0,
                borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.45)' : 'none',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;