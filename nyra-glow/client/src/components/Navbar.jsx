import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { label: 'Home',       href: '#home' },
  { label: 'Services',   href: '#services' },
  { label: 'Team',       href: '#team' },
  { label: 'Gallery',    href: '#gallery' },
  { label: 'Gift Cards', href: '#giftcards' },
  { label: 'Contact',    href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const { user, logout }          = useAuth();
  const { isDark, toggle }        = useTheme();
  const navigate                  = useNavigate();
  const location                  = useLocation();
  const isHome                    = location.pathname === '/';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    if (!isHome) { navigate('/'); setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 300); return; }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  // colours that depend on mode & scroll
  const navBg = scrolled
    ? isDark ? 'rgba(10,10,10,0.94)' : 'rgba(250,247,240,0.94)'
    : 'transparent';
  const navBorder = scrolled ? '1px solid rgba(201,169,110,0.12)' : 'none';
  const linkColor = isDark ? 'rgba(245,240,232,0.7)' : 'rgba(26,26,26,0.65)';
  const linkHover = '#C9A96E';

  return (
    <>
      <motion.nav
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{ padding: scrolled ? '10px 0' : '20px 0', background: navBg, backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: navBorder }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none group">
            <span className="font-display text-2xl tracking-[0.22em] transition-all duration-300" style={{ color: '#C9A96E' }}>
              NYRA GLOW
            </span>
            <span className="font-body text-[9px] tracking-[0.4em] uppercase" style={{ color: isDark ? 'rgba(245,240,232,0.35)' : 'rgba(26,26,26,0.35)' }}>
              Glow beyond beauty
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <button key={link.label} onClick={() => scrollTo(link.href)}
                className="font-body text-xs tracking-[0.2em] uppercase transition-all duration-300 relative group"
                style={{ color: linkColor }}
                onMouseEnter={e => e.currentTarget.style.color = linkHover}
                onMouseLeave={e => e.currentTarget.style.color = linkColor}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full" style={{ background: '#C9A96E' }} />
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme toggle */}
            <button onClick={toggle}
              className="w-10 h-10 rounded-full flex items-center justify-center text-base transition-all duration-300"
              style={{ border: '1px solid rgba(201,169,110,0.35)', color: '#C9A96E', background: 'transparent' }}
              title={isDark ? 'Light Mode' : 'Dark Mode'}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,169,110,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                {user.isAdmin && <Link to="/admin" className="font-body text-xs tracking-widest uppercase" style={{ color: '#C9A96E' }}>Admin</Link>}
                <Link to="/profile" className="font-body text-xs tracking-widest uppercase" style={{ color: linkColor }}>{user.name.split(' ')[0]}</Link>
                <button onClick={() => { logout(); navigate('/'); }} className="btn-gold">Logout</button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="font-body text-xs tracking-widest uppercase" style={{ color: linkColor }}>Login</Link>
                <button onClick={() => scrollTo('#contact')} className="btn-gold-fill rounded-sm">Book Now</button>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5">
            {[menuOpen ? 'rotate-45 translate-y-1.5' : '', menuOpen ? 'opacity-0 scale-x-0' : '', menuOpen ? '-rotate-45 -translate-y-1.5' : ''].map((cls, i) => (
              <span key={i} className={`block h-px transition-all duration-300 ${i === 1 ? 'w-4' : 'w-6'} ${cls}`} style={{ background: '#C9A96E' }} />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 pt-24 px-8 flex flex-col gap-6 lg:hidden"
            style={{ background: isDark ? 'rgba(10,10,10,0.98)' : 'rgba(250,247,240,0.98)', backdropFilter: 'blur(24px)' }}
          >
            {navLinks.map((link, i) => (
              <motion.button key={link.label}
                initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => scrollTo(link.href)}
                className="text-left font-display text-4xl transition-colors"
                style={{ color: isDark ? '#F5F0E8' : '#1A1A1A' }}
                onMouseEnter={e => e.currentTarget.style.color = '#C9A96E'}
                onMouseLeave={e => e.currentTarget.style.color = isDark ? '#F5F0E8' : '#1A1A1A'}
              >
                {link.label}
              </motion.button>
            ))}

            <div className="pt-6 flex flex-col gap-4" style={{ borderTop: '1px solid rgba(201,169,110,0.15)' }}>
              <button onClick={toggle} className="btn-gold w-fit text-xs">
                {isDark ? '☀️  Light Mode' : '🌙  Dark Mode'}
              </button>
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setMenuOpen(false)} className="font-body text-sm" style={{ color: linkColor }}>My Profile</Link>
                  {user.isAdmin && <Link to="/admin" onClick={() => setMenuOpen(false)} className="font-body text-sm" style={{ color: '#C9A96E' }}>Admin Panel</Link>}
                  <button onClick={() => { logout(); navigate('/'); setMenuOpen(false); }} className="btn-gold w-full text-center py-3">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="font-body text-sm" style={{ color: linkColor }}>Login</Link>
                  <Link to="/signup" onClick={() => setMenuOpen(false)} className="btn-gold-fill w-full text-center py-3 block rounded-sm">Sign Up</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
