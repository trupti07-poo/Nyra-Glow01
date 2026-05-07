import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { isDark } = useTheme();
  const year   = new Date().getFullYear();
  const secBg  = isDark ? '#050505' : '#F0EBE0';
  const border = 'rgba(201,169,110,0.12)';
  const muted  = isDark ? 'rgba(245,240,232,0.32)' : 'rgba(26,26,26,0.38)';
  const scrollTo = id => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer style={{ background: secBg, borderTop: `1px solid ${border}` }} className="pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h3 className="font-display text-3xl tracking-[0.22em] mb-2" style={{ color: '#C9A96E' }}>NYRA GLOW</h3>
            <p className="font-display italic text-sm mb-5" style={{ color: muted }}>Glow beyond beauty</p>
            <p className="font-body text-xs leading-relaxed max-w-xs" style={{ color: muted }}>
              A sanctuary of luxury and wellness. We believe every person deserves to feel extraordinary.
            </p>
            <div className="flex gap-3 mt-6">
              {['Instagram', 'Facebook', 'Pinterest'].map(s => (
                <a key={s} href="#" className="font-body text-[9px] tracking-widest uppercase px-3 py-2 rounded-sm transition-all"
                  style={{ color: muted, border: `1px solid ${border}` }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#C9A96E'; e.currentTarget.style.borderColor = 'rgba(201,169,110,0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = muted; e.currentTarget.style.borderColor = border; }}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-body text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: '#C9A96E' }}>Navigate</h4>
            <ul className="space-y-3">
              {[['Services','#services'],['Our Team','#team'],['Gallery','#gallery'],['Gift Cards','#giftcards'],['Contact','#contact']].map(([label, id]) => (
                <li key={label}>
                  <button onClick={() => scrollTo(id)} className="font-body text-xs transition-colors" style={{ color: muted }}
                    onMouseEnter={e => e.currentTarget.style.color = '#C9A96E'}
                    onMouseLeave={e => e.currentTarget.style.color = muted}>{label}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: '#C9A96E' }}>Reach Us</h4>
            <ul className="space-y-3">
              <li className="font-body text-xs" style={{ color: muted }}>12, Palace Road, Mysuru</li>
              <li><a href="tel:+919353231012" className="font-body text-xs transition-colors" style={{ color: muted }}
                onMouseEnter={e => e.currentTarget.style.color = '#C9A96E'}
                onMouseLeave={e => e.currentTarget.style.color = muted}>+91 93532 31012</a></li>
              <li><a href="mailto:hello@nyraglow.com" className="font-body text-xs transition-colors" style={{ color: muted }}
                onMouseEnter={e => e.currentTarget.style.color = '#C9A96E'}
                onMouseLeave={e => e.currentTarget.style.color = muted}>hello@nyraglow.com</a></li>
              <li className="font-body text-xs" style={{ color: muted }}>Mon–Sat: 9AM – 8PM</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderTop:`1px solid ${border}` }}>
          <p className="font-body text-[10px] tracking-widest" style={{ color: muted }}>© {year} NYRA GLOW. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            {['Privacy Policy','Terms of Service'].map(t => (
              <a key={t} href="#" className="font-body text-[10px] tracking-widest transition-colors" style={{ color: muted }}
                onMouseEnter={e => e.currentTarget.style.color = '#C9A96E'}
                onMouseLeave={e => e.currentTarget.style.color = muted}>{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
