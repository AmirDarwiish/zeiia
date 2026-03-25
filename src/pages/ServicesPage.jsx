import { Code, Smartphone, Layout, Settings } from 'lucide-react';
import { useLang } from '../context/LangContext';
import useReveal from '../hooks/useReveal';

const Tag = ({ children }) => (
  <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 16 }}>
    {children}
  </span>
);

const Section = ({ id, bg, children, style = {} }) => (
  <section id={id} style={{ padding: '64px 24px', background: bg || '#fff', ...style }}>
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>{children}</div>
  </section>
);

const serviceIcons = [<Code size={22}/>, <Smartphone size={22}/>, <Layout size={22}/>, <Settings size={22}/>];

const ServicesPage = () => {
  const { t } = useLang();
  const ref   = useReveal();

  return (
    <Section id="services" bg="#f8fafc" style={{ paddingTop: 120 }}>
      <div ref={ref} className="section-animate">

        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 64px' }}>
          <Tag>{t.services.tag}</Tag>
          <h2 style={{ fontSize: 'clamp(24px,3vw,38px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
            {t.services.title}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 24 }}>
          {t.services.items.map((s, i) => (
            <div
              key={i}
              style={{ background: '#fff', padding: '36px 28px', borderRadius: 20, border: '1px solid #f1f5f9', transition: 'all .25s', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 20px 48px rgba(201,169,110,.12)'; e.currentTarget.style.borderColor = '#E8D5B0'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#f1f5f9'; }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 14, background: '#F5EDD9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9A96E', marginBottom: 24 }}>
                {serviceIcons[i]}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10, color: '#0f172a' }}>{s.title}</h3>
              <p  style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </Section>
  );
};

export default ServicesPage;