import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../../context/LangContext';

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80',
    tag: { en: 'Web Development', ar: 'تطوير المواقع' },
  },
  {
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    tag: { en: 'Mobile Apps', ar: 'تطبيقات الجوال' },
  },
  {
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    tag: { en: 'Custom Systems', ar: 'أنظمة مخصصة' },
  },
];

const HeroIllustration = () => {
  const { t, isRtl } = useLang();
  const [cur, setCur] = useState(0);
  const autoRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCur((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    autoRef.current = setInterval(nextSlide, 5000);
    return () => clearInterval(autoRef.current);
  }, [nextSlide]);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 500, margin: '0 auto' }}>
      {/* الإطار الخارجي المزخرف */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2, 
        background: '#fff', 
        borderRadius: 32, 
        padding: 12, 
        boxShadow: '0 40px 100px rgba(15,23,42,0.08)',
        border: '1px solid #f1f5f9'
      }}>
        
        {/* منطقة الـ Carousel */}
        <div style={{ 
          position: 'relative', 
          height: 380, 
          borderRadius: 24, 
          overflow: 'hidden',
          background: '#f8fafc' 
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={cur}
              initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
              transition={{ duration: 0.6, ease: "inset" }}
              style={{ position: 'absolute', inset: 0 }}
            >
              {/* الصورة مع تأثير الزووم */}
              <motion.img
                src={SLIDES[cur].image}
                animate={{ scale: [1, 1.1] }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              
              {/* تدرج ظلي للنصوص */}
              <div style={{ 
                position: 'absolute', 
                inset: 0, 
                background: 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, transparent 60%)' 
              }} />

              {/* نصوص الشريحة */}
              <div style={{ 
                position: 'absolute', 
                bottom: 24, 
                left: isRtl ? 'auto' : 24, 
                right: isRtl ? 24 : 'auto',
                textAlign: isRtl ? 'right' : 'left'
              }}>
                <span style={{ 
                  display: 'inline-block', 
                  padding: '4px 12px', 
                  background: 'rgba(201,169,110,0.9)', 
                  color: '#fff', 
                  borderRadius: 50, 
                  fontSize: 10, 
                  fontWeight: 700,
                  marginBottom: 8,
                  textTransform: 'uppercase'
                }}>
                  {isRtl ? SLIDES[cur].tag.ar : SLIDES[cur].tag.en}
                </span>
                <h4 style={{ color: '#fff', fontSize: 20, fontWeight: 800, margin: 0 }}>
                  {t.services.items[cur].title}
                </h4>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* عداد صغير */}
          <div style={{ 
            position: 'absolute', 
            top: 20, 
            right: isRtl ? 'auto' : 20, 
            left: isRtl ? 20 : 'auto',
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            padding: '4px 10px',
            borderRadius: 12,
            color: '#fff',
            fontSize: 12,
            fontWeight: 700
          }}>
            0{cur + 1} / 0{SLIDES.length}
          </div>
        </div>
      </div>

      {/* نقاط التنقل (Dots) أسفل الكاروسيل */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 8, 
        marginTop: 24 
      }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCur(i)}
            style={{ 
              width: i === cur ? 32 : 8, 
              height: 8, 
              borderRadius: 4, 
              background: i === cur ? '#C9A96E' : '#e2e8f0', 
              border: 'none', 
              cursor: 'pointer',
              transition: 'all 0.4s ease'
            }}
          />
        ))}
      </div>

      {/* عناصر ديكورية خلف الكاروسيل */}
      <div style={{ 
        position: 'absolute', 
        top: -20, 
        right: -20, 
        width: 100, 
        height: 100, 
        background: '#F5EDD9', 
        borderRadius: '50%', 
        zIndex: 0, 
        opacity: 0.5 
      }} />
    </div>
  );
};

export default HeroIllustration;