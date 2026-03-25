// ─── Tag ────────────────────────────────────────────────────────────────────
export const Tag = ({ children }) => (
  <span style={{
    display: 'inline-block', fontSize: 11, fontWeight: 700,
    letterSpacing: '0.12em', textTransform: 'uppercase',
    color: '#C9A96E', marginBottom: 16,
  }}>
    {children}
  </span>
);

// ─── Btn ────────────────────────────────────────────────────────────────────
export const Btn = ({ href, primary, children, style = {} }) => (
  <a
    href={href}
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '14px 32px', borderRadius: 14, fontWeight: 700,
      fontSize: 15, textDecoration: 'none', transition: 'all .2s',
      background: primary ? '#C9A96E' : '#f1f5f9',
      color:      primary ? '#fff'    : '#334155',
      boxShadow:  primary ? '0 8px 24px rgba(201,169,110,.25)' : 'none',
      ...style,
    }}
    onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
  >
    {children}
  </a>
);

// ─── Section ────────────────────────────────────────────────────────────────
export const Section = ({ id, bg, children, style = {} }) => (
  <section id={id} style={{ padding: '64px 24px', background: bg || '#fff', ...style }}>
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>{children}</div>
  </section>
);
