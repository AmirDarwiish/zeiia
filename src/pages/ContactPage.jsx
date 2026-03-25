import { useState, useEffect } from 'react';
import { Mail, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { Section, Tag } from '../components/shared/index.jsx';
import countries from '../constants/countries';
import useReveal from '../hooks/useReveal';

const ContactPage = () => {
  const { t, isRtl } = useLang();
  const ref           = useReveal();

  const [formStatus,   setFormStatus]   = useState(null);   // null | 'sending' | 'success'
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formData,     setFormData]     = useState({
    name: '', email: '', phone: '', countryCode: '+20', message: '',
  });

  // Close dropdown on outside click
  useEffect(() => {
    const handler = e => { if (!e.target.closest('.country-dropdown')) setDropdownOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Auto-detect country code
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
    <Section id="contact" bg="#f8fafc" style={{ paddingTop: 120 }}>
      <div ref={ref} className="section-animate">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }} className="contact-grid">

          {/* ── Left info ── */}
          <div>
            <Tag>{t.contact.tag}</Tag>
            <h2 style={{ fontSize: 'clamp(28px,3vw,42px)', fontWeight: 800, marginBottom: 16, lineHeight: 1.15 }}>
              {t.contact.title}
            </h2>
            <p style={{ color: '#64748b', fontSize: 16, marginBottom: 40, lineHeight: 1.7 }}>{t.contact.sub}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { Icon: Mail,  label: isRtl ? 'راسلنا' : 'Email us',          value: 'sales@zeiia.com'  },
                { Icon: Phone, label: isRtl ? 'اتصل / واتساب' : 'Call / WhatsApp', value: '+201207715484' },
              ].map(({ Icon, label, value }) => (
                <div
                  key={label}
                  style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 18, background: '#fff', borderRadius: 18, border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,.04)', transition: 'all .2s', cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#E8D5B0')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#f1f5f9')}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#0f172a' }} dir="ltr">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right form ── */}
          <div style={{ background: '#fff', padding: '48px 40px', borderRadius: 28, border: '1px solid #f1f5f9', boxShadow: '0 32px 64px rgba(0,0,0,.08)' }}>
            {formStatus === 'success' ? (
              <div style={{ minHeight: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#f0fdf4', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                  <ShieldCheck size={36} />
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>{t.contact.success}</h3>
                <p style={{ color: '#64748b' }}>{t.contact.successSub}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                {/* Name + Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[
                    { key: 'name',  label: t.contact.formName,  type: 'text',  placeholder: isRtl ? 'محمد أحمد' : 'John Doe',
                      onChange: v => /^[\u0600-\u06FFa-zA-Z\s]*$/.test(v) && setFormData(p => ({ ...p, name: v })) },
                    { key: 'email', label: t.contact.formEmail, type: 'email', placeholder: 'hello@example.com',
                      onChange: v => setFormData(p => ({ ...p, email: v })) },
                  ].map(({ key, label, type, placeholder, onChange }) => (
                    <div key={key}>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 8 }}>{label}</label>
                      <input
                        required type={type} placeholder={placeholder} value={formData[key]}
                        onChange={e => onChange(e.target.value)}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1.5px solid #e2e8f0', background: '#f8fafc', fontSize: 14, fontFamily: 'Tajawal,sans-serif', outline: 'none', transition: 'border-color .2s', boxSizing: 'border-box' }}
                        onFocus={e => (e.target.style.borderColor = '#C9A96E')}
                        onBlur={e  => (e.target.style.borderColor = '#e2e8f0')}
                      />
                    </div>
                  ))}
                </div>

                {/* Phone */}
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 8 }}>
                    {isRtl ? 'رقم الهاتف' : 'Phone Number'}
                  </label>
                  <div style={{ display: 'flex', gap: 8 }}>

                    {/* Country dropdown */}
                    <div className="country-dropdown" style={{ position: 'relative', flexShrink: 0 }}>
                      <div
                        onClick={() => setDropdownOpen(o => !o)}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 10px', borderRadius: 12, minWidth: 110, border: '1.5px solid #e2e8f0', background: '#f8fafc', cursor: 'pointer', fontSize: 14, fontFamily: 'Tajawal,sans-serif', userSelect: 'none' }}
                      >
                        <img src={`https://flagcdn.com/w20/${selectedCountry?.iso}.png`} width="20" height="14" style={{ borderRadius: 2, objectFit: 'cover', flexShrink: 0 }} />
                        <span style={{ color: '#0f172a', fontWeight: 600 }}>{formData.countryCode}</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginInlineStart: 'auto', color: '#94a3b8', transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
                          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>

                      {dropdownOpen && (
                        <div style={{ position: 'absolute', top: '110%', left: 0, background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,.12)', zIndex: 100, maxHeight: 220, overflowY: 'auto', minWidth: 170 }}>
                          {countries.map(c => (
                            <div
                              key={c.code}
                              onClick={() => { setFormData(p => ({ ...p, countryCode: c.code })); setDropdownOpen(false); }}
                              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', cursor: 'pointer', fontSize: 13, fontFamily: 'Tajawal,sans-serif', background: formData.countryCode === c.code ? '#F5EDD9' : 'transparent', color: formData.countryCode === c.code ? '#C9A96E' : '#334155', transition: 'background .15s' }}
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

                    {/* Number input */}
                    <input
                      required type="tel" dir="ltr"
                      placeholder={selectedCountry?.placeholder || '000 000 0000'}
                      value={formData.phone}
                      onChange={e => { const v = e.target.value; if (/^[0-9\s]*$/.test(v)) setFormData(p => ({ ...p, phone: v })); }}
                      style={{ flex: 1, padding: '12px 16px', borderRadius: 12, border: '1.5px solid #e2e8f0', background: '#f8fafc', fontSize: 14, fontFamily: 'Tajawal,sans-serif', outline: 'none', transition: 'border-color .2s', boxSizing: 'border-box' }}
                      onFocus={e => (e.target.style.borderColor = '#C9A96E')}
                      onBlur={e  => (e.target.style.borderColor = '#e2e8f0')}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 8 }}>{t.contact.formMsg}</label>
                  <textarea
                    required rows={5} placeholder={isRtl ? 'اكتب رسالتك هنا...' : 'Tell us about your project...'}
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1.5px solid #e2e8f0', background: '#f8fafc', fontSize: 14, fontFamily: 'Tajawal,sans-serif', outline: 'none', resize: 'none', transition: 'border-color .2s', boxSizing: 'border-box' }}
                    onFocus={e => (e.target.style.borderColor = '#C9A96E')}
                    onBlur={e  => (e.target.style.borderColor = '#e2e8f0')}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  style={{ padding: 16, background: formStatus === 'sending' ? '#64748b' : '#0f172a', color: '#fff', borderRadius: 14, fontWeight: 800, fontSize: 15, border: 'none', cursor: formStatus === 'sending' ? 'wait' : 'pointer', fontFamily: 'Tajawal,sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'background .2s', boxShadow: '0 8px 24px rgba(15,23,42,.15)' }}
                  disabled={formStatus === 'sending'}
                  onMouseEnter={e => { if (formStatus !== 'sending') e.currentTarget.style.background = '#C9A96E'; }}
                  onMouseLeave={e => { if (formStatus !== 'sending') e.currentTarget.style.background = '#0f172a'; }}
                >
                  {formStatus === 'sending' ? (isRtl ? 'جاري الإرسال...' : 'Sending...') : t.contact.formBtn}
                  {formStatus !== 'sending' && <ArrowRight size={18} style={{ transform: isRtl ? 'rotate(180deg)' : 'none' }} />}
                </button>

              </form>
            )}
          </div>

        </div>
      </div>
    </Section>
  );
};

export default ContactPage;
