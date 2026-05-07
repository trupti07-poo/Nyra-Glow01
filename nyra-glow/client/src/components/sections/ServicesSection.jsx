import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { getServices } from '../../utils/api';

const fallbackServices = [
  { _id: '1', name: 'Signature Facial', category: 'Facial', description: 'Deep cleansing facial with premium serums and LED therapy for radiant skin.', price: 2499, duration: '75 mins', image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80', fullDescription: 'Our Signature Facial is a luxurious 75-minute journey to radiant skin. We begin with a thorough double-cleanse, followed by gentle exfoliation, an enzyme mask, and a relaxing facial massage using rose quartz rollers. Concludes with LED therapy and signature serum application.', addOns: [{ name: 'Collagen Booster', price: 500 }, { name: 'Jade Roller Massage', price: 350 }] },
  { _id: '2', name: 'Hot Stone Massage', category: 'Massage', description: 'Therapeutic full-body massage using heated basalt stones to melt deep muscle tension.', price: 3299, duration: '90 mins', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80', fullDescription: 'Experience the ancient healing power of volcanic basalt stones combined with our master therapists skilled hands. Smooth heated stones are placed along energy meridians while warm oil is worked into tired muscles, releasing months of accumulated tension.', addOns: [{ name: 'Aromatherapy Upgrade', price: 400 }, { name: 'Scalp Treatment', price: 600 }] },
  { _id: '3', name: 'Bridal Glow Package', category: 'Bridal', description: 'Complete pre-wedding beauty ritual — hair, skin, and body prepared for your perfect day.', price: 7999, duration: '180 mins', image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80', fullDescription: 'A 3-hour luxury experience including deep conditioning hair mask, full body exfoliation with rose-gold scrub, brightening facial, eyebrow threading, professional makeup application, and a glass of sparkling wine.', addOns: [{ name: 'Trial Makeup Session', price: 2000 }, { name: 'Mehndi Application', price: 1500 }] },
  { _id: '4', name: 'Keratin Treatment', category: 'Hair', description: 'Brazilian keratin smoothing for silky, frizz-free hair lasting up to 4 months.', price: 4999, duration: '120 mins', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80', fullDescription: 'Transform your hair with our professional Brazilian Keratin Treatment. Keratin proteins penetrate each strand, eliminating frizz and adding mirror-like shine. Results last 3–4 months. Aftercare kit included.', addOns: [{ name: 'Toning Treatment', price: 800 }, { name: 'Deep Conditioning Mask', price: 600 }] },
  { _id: '5', name: 'Luxury Mani & Pedi', category: 'Nails', description: 'Gel nail artistry with hot paraffin treatment and massage for hands and feet.', price: 1999, duration: '60 mins', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80', fullDescription: 'Indulge your hands and feet with our most luxurious nail care ritual — warm milk soak, cuticle care, hot paraffin wax treatment, pressure-point massage, and premium gel polish of your choice.', addOns: [{ name: 'Nail Art Design', price: 500 }, { name: 'Paraffin Upgrade', price: 300 }] },
  { _id: '6', name: 'Aromatherapy Body Wrap', category: 'Body', description: 'Detoxifying body wrap with essential oils to purify, soften, and rejuvenate skin.', price: 2799, duration: '90 mins', image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80', fullDescription: 'Dry brushing, warm aromatic seaweed & clay mask applied to your entire body, wrapped in thermal blankets to intensify absorption, with a scalp massage included. Emerge with skin that glows from within.', addOns: [{ name: 'Essential Oil Blend', price: 450 }, { name: 'Exfoliation Add-on', price: 350 }] },
];

function ServiceDetailModal({ service, onClose, onBook }) {
  const { isDark } = useTheme();
  if (!service) return null;
  const bg     = isDark ? '#111111' : '#FFFFFF';
  const text   = isDark ? '#F5F0E8' : '#1A1A1A';
  const muted  = isDark ? 'rgba(245,240,232,0.55)' : 'rgba(26,26,26,0.55)';
  const border = 'rgba(201,169,110,0.15)';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: isDark ? 'rgba(10,10,10,0.93)' : 'rgba(250,247,240,0.93)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.92, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92 }}
        onClick={e => e.stopPropagation()}
        className="relative rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        style={{ background: bg, border: `1px solid ${border}` }}>
        <img src={service.image} alt={service.name} className="w-full h-56 object-cover" />
        <div className="p-8">
          <div className="flex justify-between items-start mb-5">
            <div>
              <span className="font-body text-[9px] tracking-widest uppercase" style={{ color: '#C9A96E' }}>{service.category}</span>
              <h2 className="font-display text-3xl mt-1" style={{ color: text }}>{service.name}</h2>
            </div>
            <button onClick={onClose} className="text-2xl ml-4 transition-colors hover:text-gold" style={{ color: muted }}>×</button>
          </div>

          <div className="flex gap-8 mb-6 pb-6" style={{ borderBottom: `1px solid ${border}` }}>
            <div>
              <div className="font-display text-2xl" style={{ color: '#C9A96E' }}>₹{service.price?.toLocaleString()}</div>
              <div className="font-body text-[9px] uppercase tracking-widest mt-1" style={{ color: muted }}>Price</div>
            </div>
            <div className="w-px" style={{ background: border }} />
            <div>
              <div className="font-display text-2xl" style={{ color: text }}>{service.duration}</div>
              <div className="font-body text-[9px] uppercase tracking-widest mt-1" style={{ color: muted }}>Duration</div>
            </div>
          </div>

          <p className="font-body text-sm leading-relaxed mb-6" style={{ color: muted }}>{service.fullDescription || service.description}</p>

          {service.addOns?.length > 0 && (
            <div className="mb-6">
              <h4 className="font-body text-[10px] uppercase tracking-widest mb-3" style={{ color: '#C9A96E' }}>Available Add-ons</h4>
              {service.addOns.map((a, i) => (
                <div key={i} className="flex justify-between py-2.5" style={{ borderBottom: `1px solid ${border}` }}>
                  <span className="font-body text-sm" style={{ color: muted }}>{a.name}</span>
                  <span className="font-body text-sm font-medium" style={{ color: '#C9A96E' }}>+₹{a.price}</span>
                </div>
              ))}
            </div>
          )}

          <button onClick={() => onBook(service._id)} className="btn-gold-fill w-full py-4 rounded-sm text-center tracking-widest">
            Book This Service
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const [services, setServices] = useState(fallbackServices);
  const [selected, setSelected] = useState(null);
  const [hovered,  setHovered]  = useState(null);
  const { isDark } = useTheme();
  const navigate   = useNavigate();

  useEffect(() => { getServices().then(r => setServices(r.data)).catch(() => {}); }, []);

  const handleBook = (id) => { setSelected(null); navigate(`/book/${id}`); };

  const secBg = isDark ? '#0A0A0A' : '#FAF7F0';
  const text   = isDark ? '#F5F0E8' : '#1A1A1A';
  const muted  = isDark ? 'rgba(245,240,232,0.45)' : 'rgba(26,26,26,0.5)';

  return (
    <section id="services" className="py-28 px-6" style={{ background: secBg }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="section-subtitle mb-4">What We Offer</p>
          <h2 className="section-title">Our <span className="gold-text italic">Services</span></h2>
          <div className="divider" />
          <p className="font-body text-sm max-w-md mx-auto leading-relaxed mt-4" style={{ color: muted }}>
            Curated treatments designed to restore, renew, and reveal your most radiant self.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div key={service._id}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onHoverStart={() => setHovered(service._id)}
              onHoverEnd={() => setHovered(null)}
              className="relative overflow-hidden rounded-sm cursor-pointer"
              style={{ aspectRatio: '3/4' }}>
              <motion.img src={service.image} alt={service.name} className="w-full h-full object-cover"
                animate={{ scale: hovered === service._id ? 1.08 : 1 }} transition={{ duration: 0.6 }} />

              {/* Gradient overlay */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.95) 40%, rgba(10,10,10,0.15) 100%)' }} />

              {/* Category badge */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-sm" style={{ background: 'rgba(201,169,110,0.18)', backdropFilter: 'blur(8px)', border: '1px solid rgba(201,169,110,0.3)' }}>
                <span className="font-body text-[9px] tracking-widest uppercase" style={{ color: '#E8D5A3' }}>{service.category}</span>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <motion.div animate={{ y: hovered === service._id ? -6 : 0 }} transition={{ duration: 0.3 }}>
                  <h3 className="font-display text-xl text-white mb-1">{service.name}</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-body text-sm" style={{ color: '#C9A96E' }}>₹{service.price.toLocaleString()}</span>
                    <span className="w-px h-3" style={{ background: 'rgba(201,169,110,0.4)' }} />
                    <span className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{service.duration}</span>
                  </div>
                  <AnimatePresence>
                    {hovered === service._id && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                        <p className="font-body text-xs mb-4 leading-relaxed line-clamp-2" style={{ color: 'rgba(255,255,255,0.55)' }}>{service.description}</p>
                        <div className="flex gap-2">
                          <button onClick={() => handleBook(service._id)} className="btn-gold-fill flex-1 text-center rounded-sm py-2 text-[10px]">Book Now</button>
                          <button onClick={() => setSelected(service)} className="btn-gold flex-1 text-center rounded-sm py-2 text-[10px]">Details</button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ServiceDetailModal service={selected} onClose={() => setSelected(null)} onBook={handleBook} />}
      </AnimatePresence>
    </section>
  );
}
