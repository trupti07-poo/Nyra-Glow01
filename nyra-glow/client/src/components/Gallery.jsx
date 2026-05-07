import { motion } from 'framer-motion';

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', alt: 'Spa Treatment Room', span: 'col-span-1 row-span-1' },
  { src: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80', alt: 'Relaxing Bath', span: 'col-span-1 row-span-2' },
  { src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80', alt: 'Massage Therapy', span: 'col-span-1 row-span-1' },
  { src: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=600&q=80', alt: 'Facial Treatment', span: 'col-span-1 row-span-1' },
  { src: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80', alt: 'Nail Art', span: 'col-span-1 row-span-1' },
  { src: 'https://images.unsplash.com/photo-1583500178450-e59e4309b57f?w=600&q=80', alt: 'Beauty Products', span: 'col-span-1 row-span-1' },
  { src: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&q=80', alt: 'Hair Styling', span: 'col-span-1 row-span-1' },
  { src: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80', alt: 'Luxury Interior', span: 'col-span-2 row-span-1' },
  { src: 'https://images.unsplash.com/photo-1473187983305-f615310e7daa?w=600&q=80', alt: 'Candle Spa', span: 'col-span-1 row-span-1' },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-28 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <p className="section-subtitle mb-4">✦ Our Space ✦</p>
          <h2 className="section-title mb-6">Gallery</h2>
          <div className="divider-gold max-w-xs mx-auto mb-8" />
          <p className="font-body text-cream/60 max-w-xl mx-auto text-sm leading-relaxed">
            A glimpse into the serene world of Nyra Glow — where beauty meets tranquility.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden group cursor-pointer rounded-sm ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-onyx/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-10 h-10 border border-gold-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-gold-600 text-lg">+</span>
                  </div>
                  <p className="text-xs text-cream/80 tracking-widest uppercase">{img.alt}</p>
                </div>
              </div>

              {/* Gold corner accents on hover */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
