import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const images = [
  { src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',  alt: 'Spa ambience',     span: 'col-span-2 row-span-2' },
  { src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80',  alt: 'Massage therapy' },
  { src: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',  alt: 'Facial treatment' },
  { src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80',  alt: 'Hot stones' },
  { src: 'https://images.unsplash.com/photo-1470259078422-826894b933aa?w=600&q=80',  alt: 'Relaxation' },
  { src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80',  alt: 'Nail art',         span: 'col-span-2' },
  { src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',  alt: 'Hair styling' },
  { src: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&q=80',  alt: 'Body wrap' },
  { src: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&q=80',  alt: 'Spa pool' },
  { src: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80',  alt: 'Facial glow' },
];

export default function GallerySection() {
  const [lightbox, setLightbox] = useState(null);
  const { isDark } = useTheme();
  const secBg = isDark ? '#0A0A0A' : '#FAF7F0';

  return (
    <section id="gallery" className="py-28 px-6" style={{ background: secBg }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="section-subtitle mb-4">Visual Journey</p>
          <h2 className="section-title">Our <span className="gold-text italic">Gallery</span></h2>
          <div className="divider" />
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px]">
          {images.map((img, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
              onClick={() => setLightbox(img)}
              className={`relative overflow-hidden cursor-pointer group ${img.span || ''}`}>
              <img src={img.src} alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80'; }} />

              {/* Gold hover overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'rgba(201,169,110,0.1)' }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.75), transparent)' }} />

              {/* Plus icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <div className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ border: '1px solid rgba(201,169,110,0.7)', background: 'rgba(10,10,10,0.4)' }}>
                  <span className="text-xl font-light" style={{ color: '#E8D5A3' }}>+</span>
                </div>
              </div>

              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="font-body text-[10px] tracking-widest uppercase" style={{ color: 'rgba(232,213,163,0.85)' }}>{img.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(10,10,10,0.96)', backdropFilter: 'blur(20px)' }}
            onClick={() => setLightbox(null)}>
            <motion.img initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
              src={lightbox.src.replace('w=600', 'w=1200').replace('w=800', 'w=1400')}
              alt={lightbox.alt}
              className="max-w-4xl w-full max-h-[85vh] object-contain rounded-sm"
              style={{ boxShadow: '0 0 80px rgba(201,169,110,0.1)' }} />
            <button onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full flex items-center justify-center text-2xl transition-all"
              style={{ background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.3)', color: '#E8D5A3' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,169,110,0.3)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(201,169,110,0.15)'}>
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
