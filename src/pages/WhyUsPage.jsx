import { Zap, BarChart, ShieldCheck, Headphones } from 'lucide-react';
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

const whyIcons = [<Zap size={18}/>, <BarChart size={18}/>, <ShieldCheck size={18}/>, <Headphones size={18}/>];

const problemCards = (isRtl) => [
  {
    problem:  isRtl ? 'عندي فكرة لكن لا أعرف كيف أحوّلها لمنتج' : "I have an idea but don't know where to start",
    solution: isRtl ? 'نأخذك من الفكرة إلى منتج حقيقي جاهز للسوق' : 'We take you from idea to a market-ready product',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>,
  },
  {
    problem:  isRtl ? 'تعاملت مع شركات من قبل ولم تلتزم بالمواعيد أو الجودة' : 'I tried other agencies and got disappointed',
    solution: isRtl ? 'نلتزم بجداول زمنية واضحة ومعايير جودة موثقة منذ اليوم الأول' : 'We commit to clear timelines and documented quality standards from day one',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    problem:  isRtl ? 'لا أعرف أي التقنيات تناسب مشروعي وميزانيتي' : "I don't know the right tech for my project",
    solution: isRtl ? 'نقيّم احتياجاتك ونوصي بأنسب التقنيات لهدفك وميزانيتك' : 'We evaluate your needs and recommend the best tech for your goal and budget',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  },
];

const WhyUsPage = () => {
  const { t, isRtl } = useLang();
  const ref           = useReveal();
  const cards         = problemCards(isRtl);

  return (
    <Section id="why-us" style={{ paddingTop: 120 }}>
      <div ref={ref} className="section-animate">

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="why-grid">

          <div>
            <Tag>{t.whyUs.tag}</Tag>
            <h2 style={{ fontSize: 'clamp(28px,3vw,40px)', fontWeight: 800, lineHeight: 1.2, marginBottom: 40 }}>
              {t.whyUs.title}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {t.whyUs.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#0f172a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {whyIcons[i]}
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 800, fontSize: 17, marginBottom: 6 }}>{item.title}</h4>
                    <p  style={{ color: '#64748b', fontSize: 14, lineHeight: 1.7 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {cards.map((card, i) => (
              <div
                key={i}
                style={{ padding: '20px 24px', borderRadius: 18, background: i === 0 ? 'rgba(201,169,110,0.12)' : 'rgba(255,255,255,0.05)', border: `1px solid ${i === 0 ? 'rgba(201,169,110,0.3)' : 'rgba(255,255,255,0.08)'}`, transition: 'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,169,110,0.12)'; e.currentTarget.style.borderColor = 'rgba(201,169,110,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = i === 0 ? 'rgba(201,169,110,0.12)' : 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = i === 0 ? 'rgba(201,169,110,0.3)' : 'rgba(255,255,255,0.08)'; }}
              >
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: 'rgba(201,169,110,0.2)', color: '#C9A96E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {card.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6, lineHeight: 1.5 }}>"{card.problem}"</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#C9A96E', lineHeight: 1.5 }}>→ {card.solution}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </Section>
  );
};

export default WhyUsPage;