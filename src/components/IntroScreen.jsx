import { useLang } from '../context/LangContext';

const IntroScreen = ({ leaving }) => {
  const { isRtl } = useLang();

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(255,255,255,0.22)',
      backdropFilter: 'blur(45px)', WebkitBackdropFilter: 'blur(45px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: leaving ? 'introOut 1.6s cubic-bezier(0.85,0,0.15,1) forwards' : 'none',
    }}>
      <div style={{ position: 'relative', width: 600, height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        {/* Background golden lines */}
        <svg width="600" height="600" viewBox="0 0 520 520" style={{ position: 'absolute', zIndex: 1 }}>
          <defs>
            <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#D4AF37" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="260" cy="260" r="160" fill="url(#goldGlow)" style={{ opacity: 0, animation: 'fadeInLogo 2s ease forwards 0.5s' }} />
          {[0,1,2,3,4,5,6,7].map(i => (
            <path key={i}
              d={`M ${120+i*2} ${260} C ${200} ${200-i*5}, ${320} ${320+i*5}, ${400-i*2} ${260}`}
              stroke="#C9A96E" strokeWidth="0.6" opacity={0.12+i*0.04} fill="none"
              style={{ strokeDasharray: 450, strokeDashoffset: 450, animation: `drawLines 2.5s ease-out forwards ${0.1+i*0.12}s` }}
            />
          ))}
        </svg>

        {/* Logo */}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <svg width="380" height="220" viewBox="0 0 200 120" fill="none" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="premiumGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#008080" />
                <stop offset="50%"  stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#C9A96E" />
              </linearGradient>
              <filter id="goldShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path
              d="M170 30C170 30 150 20 130 50C110 80 90 80 70 50C50 20 30 30 30 30"
              stroke="url(#premiumGold)" strokeWidth="6.5" strokeLinecap="round" filter="url(#goldShadow)"
              style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animation: 'drawLines 3s cubic-bezier(0.45,0,0.55,1) forwards 0.5s' }}
            />
            <circle cx="170" cy="18" r="5.5" fill="#D4AF37" filter="url(#goldShadow)"
              style={{ opacity: 0, animation: 'popIn 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards 2.5s, pulseDot 2.5s infinite 4s' }} />
            <circle cx="98" cy="88" r="4.5" fill="#008080" filter="url(#goldShadow)"
              style={{ opacity: 0, animation: 'popIn 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards 2.8s' }} />
            <circle cx="116" cy="88" r="4.5" fill="#008080" filter="url(#goldShadow)"
              style={{ opacity: 0, animation: 'popIn 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards 3s' }} />
          </svg>

          <div style={{
            marginTop: 30, fontFamily: "'Tajawal', sans-serif",
            color: '#D4AF37', fontSize: 15, fontWeight: 900, textTransform: 'uppercase',
            opacity: 0, animation: 'fadeInLogo 1s ease forwards 2s',
          }}>
            {isRtl ? 'شريكك التقني' : 'YOUR TECH PARTNER'}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes drawLines    { to { stroke-dashoffset: 0; } }
        @keyframes popIn        { 0% { opacity:0; transform:scale(0); } 100% { opacity:1; transform:scale(1); } }
        @keyframes fadeInLogo   { from { opacity:0; filter:blur(8px); } to { opacity:1; filter:blur(0); } }
        @keyframes pulseDot     { 0%,100% { transform:scale(1); filter:brightness(1); } 50% { transform:scale(1.25); filter:brightness(1.4); } }
        @keyframes introOut     { 0% { transform:scale(1); opacity:1; filter:blur(0); } 100% { transform:scale(1.05) translateY(-30px); opacity:0; filter:blur(30px); } }
      `}</style>
    </div>
  );
};

export default IntroScreen;
