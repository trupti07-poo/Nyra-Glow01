import { motion } from 'framer-motion';

export default function Hero() {
  const scrollToBooking = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative w-full h-screen min-h-[700px] overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80"
      >
        <source
          src="https://www.pexels.com/download/video/3225528/?fps=25.0&h=1080&w=1920"
          type="video/mp4"
        />
        {/* Fallback image if video fails */}
      </video>

      {/* Dark Overlay */}
      <div className="hero-overlay absolute inset-0 z-10" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-px h-40 bg-gradient-to-b from-transparent via-gold-600/40 to-transparent" />
        <div className="absolute top-1/4 right-10 w-px h-40 bg-gradient-to-b from-transparent via-gold-600/40 to-transparent" />
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-gold-600/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="font-accent text-xs tracking-[0.5em] uppercase text-gold-600 mb-6">
            ✦ Welcome to ✦
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-7xl md:text-9xl font-light text-cream leading-none mb-4"
          style={{ textShadow: '0 0 80px rgba(201, 169, 110, 0.3)' }}
        >
          Nyra Glow
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="divider-gold max-w-xs mx-auto my-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="font-display italic text-2xl md:text-3xl text-cream/80 mb-12 font-light"
        >
          Glow beyond beauty
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button onClick={scrollToBooking} className="btn-gold text-sm py-4 px-10">
            Book Appointment
          </button>
          <button onClick={scrollToServices} className="btn-outline-gold text-sm py-4 px-10 text-cream border-cream/40 hover:border-gold-600">
            Explore Services
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex items-center justify-center gap-12 mt-20"
        >
          {[
            { num: '500+', label: 'Happy Clients' },
            { num: '15+', label: 'Expert Therapists' },
            { num: '50+', label: 'Luxury Services' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl gold-text">{stat.num}</p>
              <p className="font-body text-xs tracking-widest uppercase text-cream/50 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="font-body text-xs tracking-widest uppercase text-cream/40">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold-600/40 to-transparent" />
      </motion.div>
    </section>
  );
}
