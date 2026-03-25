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
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #f1f5f9',
    }}>
      {/* ── Inner bar ── */}
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '0 24px',
        height: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
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
            borderRadius: 10, border: '1px solid #e2e8f0', background: 'transparent',
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
          <button onClick={toggleLang} style={{ padding: 8, border: '1px solid #f1f5f9', borderRadius: 10, background: '#f8fafc', cursor: 'pointer', color: '#475569' }}>
            <Globe size={18} />
          </button>
          <button onClick={() => setIsMenuOpen(o => !o)} style={{ padding: 8, border: 'none', background: 'none', cursor: 'pointer', color: '#0f172a' }}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div style={{
          position: 'absolute', top: 80, left: 0, right: 0, background: '#fff',
          borderBottom: '1px solid #f1f5f9', padding: '24px',
          display: 'flex', flexDirection: 'column', gap: 20,
          boxShadow: '0 20px 40px rgba(0,0,0,.08)',
        }}>
          {[...navLinks, ['/contact', t.nav.contact]].map(([to, label], i, arr) => (
            <Link
              key={to} to={to}
              onClick={() => setIsMenuOpen(false)}
              style={{
                fontSize: 20, fontWeight: 800, textDecoration: 'none',
                color: i === arr.length - 1 ? '#C9A96E' : '#0f172a',
                paddingBottom: i < arr.length - 1 ? 16 : 0,
                borderBottom: i < arr.length - 1 ? '1px solid #f8fafc' : 'none',
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
