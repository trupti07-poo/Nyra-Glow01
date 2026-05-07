import { motion } from 'framer-motion';

const giftCards = [
  {
    name: 'Serenity',
    price: 2500,
    description: 'Perfect for a first spa experience',
    includes: ['1 Facial Treatment', '1 Head Massage', 'Welcome Tea'],
    color: 'from-amber-900/40 to-yellow-900/20',
    accent: '#c9a96e'
  },
  {
    name: 'Bliss',
    price: 5000,
    description: 'Our most popular gift experience',
    includes: ['Full Body Massage', 'Gold Facial', 'Mani-Pedi', 'Welcome Drink'],
    color: 'from-rose-900/40 to-pink-900/20',
    accent: '#e8a0b4',
    popular: true
  },
  {
    name: 'Royale',
    price: 10000,
    description: 'The ultimate luxury gifting experience',
    includes: ['Bridal Glow Package', 'Hair Treatment', 'Full Day Access', 'Gourmet Lunch', 'Gift Hamper'],
    color: 'from-purple-900/40 to-indigo-900/20',
    accent: '#b8a0e8'
  },
];

export default function GiftCards() {
  return (
    <section id="gift-cards" className="py-28 px-6 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(201, 169, 110, 0.03) 0%, transparent 70%)'
        }} />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <p className="section-subtitle mb-4">✦ Give the Gift of Glow ✦</p>
          <h2 className="section-title mb-6">Gift Cards</h2>
          <div className="divider-gold max-w-xs mx-auto mb-8" />
          <p className="font-body text-cream/60 max-w-xl mx-auto text-sm leading-relaxed">
            Share the luxury of Nyra Glow with someone special. Our beautifully packaged gift cards make the perfect present for any occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {giftCards.map((card, i) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className={`relative glass rounded-xl overflow-hidden card-hover ${card.popular ? 'ring-1 ring-gold-600/50' : ''}`}
            >
              {card.popular && (
                <div className="absolute top-4 right-4 bg-gold-600 text-onyx text-[10px] font-accent tracking-widest uppercase px-3 py-1 rounded-full z-10">
                  Most Popular
                </div>
              )}

              {/* Card Visual */}
              <div className={`relative bg-gradient-to-br ${card.color} p-8 pb-12`}>
                <div className="absolute top-0 left-0 w-full h-full opacity-20"
                  style={{
                    backgroundImage: `repeating-linear-gradient(45deg, ${card.accent}11 0px, ${card.accent}11 1px, transparent 0px, transparent 50%)`,
                    backgroundSize: '20px 20px'
                  }}
                />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="font-accent text-xs tracking-widest uppercase mb-1" style={{ color: card.accent }}>
                        Nyra Glow
                      </p>
                      <h3 className="font-display text-4xl text-cream">{card.name}</h3>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-3xl" style={{ color: card.accent }}>
                        ₹{card.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="font-body text-xs text-cream/60 italic">{card.description}</p>

                  {/* Decorative elements */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full opacity-10 -mr-8 -mb-8"
                    style={{ background: card.accent }} />
                </div>
              </div>

              {/* Includes */}
              <div className="p-6">
                <p className="font-accent text-xs tracking-widest uppercase text-gold-600/70 mb-4">Includes</p>
                <ul className="space-y-2 mb-6">
                  {card.includes.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-cream/70">
                      <span style={{ color: card.accent }}>✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="divider-gold mb-6" />
                <button className="btn-gold w-full text-xs py-3">
                  Purchase Gift Card
                </button>
                <p className="text-center text-xs text-cream/40 mt-3">Valid for 1 year from purchase</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Amount */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 glass rounded-xl p-8 text-center"
        >
          <p className="section-subtitle mb-3">Custom Amount</p>
          <h3 className="font-display text-3xl text-cream mb-3">Create Your Own Gift</h3>
          <p className="text-cream/60 text-sm mb-6">Choose any amount from ₹1,000 to ₹50,000</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="glass rounded-lg px-6 py-3 flex items-center gap-2">
              <span className="text-gold-600 font-display text-xl">₹</span>
              <input
                type="number"
                placeholder="Enter amount"
                className="bg-transparent text-cream font-body text-sm w-32 outline-none placeholder-cream/30"
              />
            </div>
            <button className="btn-gold text-xs py-3 px-8">Get Gift Card</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
