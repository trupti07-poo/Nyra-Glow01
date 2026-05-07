import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const cards = [
  { amount: 1500, label: 'Glow Starter',  description: 'Perfect for a first-time spa experience',   gradient: 'linear-gradient(135deg, #1A1A1A, #333333)',       textColor: '#C9A96E' },
  { amount: 3500, label: 'Glow Indulge',  description: 'A full afternoon of pampering bliss',        gradient: 'linear-gradient(135deg, #8B6914, #C9A96E)',       textColor: '#0A0A0A', featured: true },
  { amount: 7500, label: 'Glow Supreme',  description: 'The ultimate luxury spa day experience',     gradient: 'linear-gradient(135deg, #C9A96E, #E8D5A3)',       textColor: '#1A1A1A' },
];

export default function GiftCardsSection() {
  const { isDark } = useTheme();
  const secBg = isDark ? '#0F0F0F' : '#F5F0E8';
  const muted  = isDark ? 'rgba(245,240,232,0.45)' : 'rgba(26,26,26,0.45)';

  return (
    <section id="giftcards" className="py-28 px-6" style={{ background: secBg }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <p className="section-subtitle mb-4">Share the Glow</p>
          <h2 className="section-title">Gift <span className="gold-text italic">Cards</span></h2>
          <div className="divider" />
          <p className="font-body text-sm max-w-md mx-auto leading-relaxed mt-4" style={{ color: muted }}>
            Give the gift of relaxation and beauty. The most thoughtful present for the people you cherish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {cards.map((card, i) => (
            <motion.div key={card.amount}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`relative rounded-sm overflow-hidden ${card.featured ? 'scale-105 z-10' : ''}`}
              style={{ minHeight: 260, boxShadow: card.featured ? '0 20px 60px rgba(201,169,110,0.25)' : '0 8px 30px rgba(0,0,0,0.2)' }}>

              <div className="absolute inset-0" style={{ background: card.gradient }} />

              {/* Pattern */}
              <div className="absolute inset-0 opacity-8"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\' fill=\'rgba(255,255,255,0.05)\'/%3E%3C/svg%3E")' }} />

              {card.featured && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-sm" style={{ background: 'rgba(10,10,10,0.5)' }}>
                  <span className="font-body text-[9px] tracking-widest uppercase" style={{ color: '#E8D5A3' }}>Most Popular</span>
                </div>
              )}

              <div className="relative z-10 p-8 flex flex-col justify-between" style={{ minHeight: 260 }}>
                <div>
                  <p className="font-body text-[10px] tracking-[0.35em] uppercase mb-2" style={{ color: `${card.textColor}99` }}>Nyra Glow</p>
                  <h3 className="font-display text-2xl mb-1" style={{ color: card.textColor }}>{card.label}</h3>
                  <p className="font-body text-xs" style={{ color: `${card.textColor}88` }}>{card.description}</p>
                </div>
                <div className="flex items-end justify-between mt-10">
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-widest mb-1" style={{ color: `${card.textColor}66` }}>Value</p>
                    <p className="font-display text-4xl" style={{ color: card.textColor }}>₹{card.amount.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${card.textColor}20`, border: `1px solid ${card.textColor}40` }}>
                    <span style={{ color: card.textColor }} className="text-xl">✦</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <p className="font-body text-sm mb-6" style={{ color: muted }}>Valid for 12 months · Redeemable for any service</p>
          <a href="https://wa.me/919353231012?text=Hi!%20I%27d%20like%20to%20purchase%20a%20Nyra%20Glow%20gift%20card."
            target="_blank" rel="noopener noreferrer" className="btn-gold-fill rounded-sm px-12 py-4 tracking-widest">
            Purchase Gift Card
          </a>
        </div>
      </div>
    </section>
  );
}
