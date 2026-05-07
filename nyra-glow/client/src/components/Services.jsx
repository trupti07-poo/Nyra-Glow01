import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getServices } from '../utils/api';

const fallbackServices = [
  {
    _id: '1', name: 'Royal Gold Facial', category: 'Facial', price: 2500, duration: 75,
    description: 'Luxurious gold-infused facial treatment for radiant, youthful skin.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80'
  },
  {
    _id: '2', name: 'Aromatherapy Massage', category: 'Massage', price: 3200, duration: 90,
    description: 'Full-body relaxation with premium essential oils and hot stones.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80'
  },
  {
    _id: '3', name: 'Bridal Glow Package', category: 'Bridal', price: 8500, duration: 240,
    description: 'Complete bridal preparation for your most radiant day.',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80'
  },
  {
    _id: '4', name: 'Deep Tissue Massage', category: 'Massage', price: 2800, duration: 60,
    description: 'Therapeutic massage targeting deep muscle layers for pain relief.',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80'
  },
  {
    _id: '5', name: 'Keratin Treatment', category: 'Hair', price: 4500, duration: 180,
    description: 'Professional keratin smoothing for silky, frizz-free hair.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80'
  },
  {
    _id: '6', name: 'Luxury Mani-Pedi', category: 'Nails', price: 1800, duration: 90,
    description: 'Premium nail care with gel polish and paraffin treatment.',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80'
  },
];

export default function Services({ onServiceSelect }) {
  const [services, setServices] = useState(fallbackServices);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    getServices()
      .then(({ data }) => { if (data.length > 0) setServices(data); })
      .catch(() => {});
  }, []);

  const categories = ['All', ...new Set(services.map(s => s.category))];
  const filtered = activeCategory === 'All' ? services : services.filter(s => s.category === activeCategory);

  return (
    <>
      <section id="services" className="py-28 px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16" data-aos="fade-up">
            <p className="section-subtitle mb-4">✦ What We Offer ✦</p>
            <h2 className="section-title mb-6">Our Services</h2>
            <div className="divider-gold max-w-xs mx-auto mb-8" />
            <p className="font-body text-cream/60 max-w-xl mx-auto text-sm leading-relaxed tracking-wide">
              From rejuvenating facials to relaxing massages, every treatment is crafted to bring out your natural radiance.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-14" data-aos="fade-up" data-aos-delay="100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 text-xs font-accent tracking-widest uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gold-600 text-onyx'
                    : 'glass text-cream/70 hover:text-gold-600 hover:border-gold-600/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((service, i) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-lg overflow-hidden card-hover group cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 left-4">
                    <span className="glass px-3 py-1 text-xs font-accent tracking-widest uppercase text-gold-600">
                      {service.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-2xl text-cream mb-2">{service.name}</h3>
                  <p className="font-body text-cream/60 text-sm leading-relaxed mb-4">{service.description}</p>
                  <div className="divider-gold mb-4" />
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="gold-text font-display text-2xl">₹{service.price.toLocaleString()}</span>
                      <span className="text-cream/40 text-xs ml-2">/ session</span>
                    </div>
                    <div className="flex items-center gap-1 text-cream/50 text-xs">
                      <span>⏱</span>
                      <span>{service.duration} min</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedService(service); }}
                    className="w-full mt-4 btn-outline-gold text-xs py-2.5 border-gold-600/40"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onBook={() => {
            setSelectedService(null);
            if (onServiceSelect) onServiceSelect(selectedService);
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}
    </>
  );
}

function ServiceDetailModal({ service, onClose, onBook }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-onyx/90 backdrop-blur-md" />
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative glass rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 glass rounded-full flex items-center justify-center text-cream/70 hover:text-red-400 transition-colors"
        >
          ✕
        </button>

        <img src={service.image} alt={service.name} className="w-full h-64 object-cover rounded-t-xl" />

        <div className="p-8">
          <p className="section-subtitle mb-2">{service.category}</p>
          <h2 className="font-display text-4xl text-cream mb-4">{service.name}</h2>
          <div className="divider-gold mb-6" />

          <p className="font-body text-cream/70 text-sm leading-relaxed mb-6">
            {service.fullDescription || service.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="glass p-4 rounded-lg text-center">
              <p className="text-xs text-cream/50 tracking-widest uppercase mb-1">Duration</p>
              <p className="font-display text-2xl gold-text">{service.duration} min</p>
            </div>
            <div className="glass p-4 rounded-lg text-center">
              <p className="text-xs text-cream/50 tracking-widest uppercase mb-1">Price</p>
              <p className="font-display text-2xl gold-text">₹{service.price.toLocaleString()}</p>
            </div>
          </div>

          {service.addons && service.addons.length > 0 && (
            <div className="mb-6">
              <h4 className="font-accent text-xs tracking-widest uppercase text-gold-600 mb-3">Available Add-ons</h4>
              <div className="space-y-2">
                {service.addons.map((addon, i) => (
                  <div key={i} className="flex justify-between items-center glass px-4 py-3 rounded-lg">
                    <span className="text-sm text-cream/80">{addon.name}</span>
                    <div className="flex items-center gap-3 text-xs text-cream/50">
                      {addon.duration > 0 && <span>+{addon.duration} min</span>}
                      <span className="text-gold-600">+₹{addon.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button onClick={onBook} className="btn-gold w-full py-4 text-sm">
            Book Now
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
