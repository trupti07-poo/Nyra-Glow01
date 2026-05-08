import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function HeroSection() {
  const navigate  = useNavigate();
  const { user }  = useAuth();
  const { isDark } = useTheme();
  const videoRef  = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // If video fails, show poster image - that's fine
        console.log('Video autoplay blocked, showing poster image');
      });
    }
  }, []);

  const handleBook       = () => user ? navigate('/book') : navigate('/login');
  const scrollToServices = () => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });

  const overlayBg = isDark
    ? 'linear-gradient(to bottom, rgba(10,10,10,0.72), rgba(10,10,10,0.45), rgba(10,10,10,0.92))'
    : 'linear-gradient(to bottom, rgba(250,247,240,0.75), rgba(250,247,240,0.50), rgba(250,247,240,0.92))';

  const mainText  = isDark ? '#F5F0E8' : '#111111';
  const subText   = isDark ? 'rgba(245,240,232,0.55)' : '#555555';
  const statVal   = isDark ? '#C9A96E' : '#8B6914';
  const statLabel = isDark ? 'rgba(245,240,232,0.4)' : '#666666';
  const lineColor = isDark ? '#C9A96E' : '#8B6914';

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">

        {/* BACKGROUND — Video with image fallback */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ opacity: isDark ? 0.45 : 0.28 }}
          poster="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80"
          crossOrigin="anonymous"
        >
          <source src="https://www.w3schools.com/howto/rain.mp4" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-woman-getting-a-spa-massage-4549-large.mp4" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-relaxing-at-a-spa-4531-large.mp4" type="video/mp4" />
        </video>

        {/* Fallback background image if video doesn't load */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: isDark ? 0.3 : 0.2,
            zIndex: -1,
          }}
        />

        <div className="absolute inset-0" style={{ background: overlayBg }} />
      </div>

      {/* Gold glow orbs */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.08), transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(232,213,163,0.06), transparent 70%)' }} />

      {/* Rotating rings */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ border: '1px solid rgba(201,169,110,0.06)' }} />
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 65, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ border: '1px solid rgba(201,169,110,0.09)' }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9 }}
          className="flex items-center justify-center gap-4 mb-8">
          <div className="w-14 h-px" style={{ background: `linear-gradient(90deg, transparent, ${lineColor})` }} />
          <span className="font-body text-[10px] tracking-[0.5em] uppercase font-semibold" style={{ color: isDark ? '#C9A96E' : '#8B6914' }}>Premium Spa & Salon</span>
          <div className="w-14 h-px" style={{ background: `linear-gradient(90deg, ${lineColor}, transparent)` }} />
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1.1 }}
          className="font-display font-light leading-none mb-5"
          style={{ fontSize: 'clamp(4.5rem, 13vw, 10rem)' }}>
          <span className="block" style={{ color: mainText }}>Nyra</span>
          <span className="block gold-text italic">Glow</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 1 }}
          className="font-display italic text-xl md:text-2xl tracking-widest mb-14"
          style={{ color: subText }}>
          Glow beyond beauty
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={handleBook} className="btn-gold-fill rounded-sm px-12 py-4 text-xs tracking-[0.25em]">
            Book Appointment
          </button>
          <button onClick={scrollToServices} className="btn-gold rounded-sm px-12 py-4 text-xs tracking-[0.25em]">
            Explore Services
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-sm mx-auto">
          {[
            { value: '500+', label: 'Happy Clients' },
            { value: '12+', label: 'Expert Therapists' },
            { value: '6',   label: 'Services' }
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="font-display text-2xl font-medium" style={{ color: statVal }}>{s.value}</div>
              <div className="font-body text-[10px] tracking-[0.2em] uppercase mt-1 font-medium" style={{ color: statLabel }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button onClick={scrollToServices}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: isDark ? 'rgba(201,169,110,0.5)' : 'rgba(139,105,20,0.6)' }}>
        <span className="font-body text-[9px] tracking-[0.35em] uppercase font-medium">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}
          className="w-px h-8" style={{ background: 'linear-gradient(to bottom, #C9A96Eaa, transparent)' }} />
      </motion.button>
    </section>
  );
}