import { motion } from 'framer-motion';

const team = [
  {
    name: 'Priya Sharma',
    role: 'Lead Esthetician',
    experience: '12 Years',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    specialty: 'Facials & Anti-aging'
  },
  {
    name: 'Ananya Mehta',
    role: 'Senior Massage Therapist',
    experience: '8 Years',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
    specialty: 'Aromatherapy & Deep Tissue'
  },
  {
    name: 'Kavitha Reddy',
    role: 'Hair Specialist',
    experience: '10 Years',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80',
    specialty: 'Keratin & Color Treatments'
  },
  {
    name: 'Deepa Nair',
    role: 'Bridal Artist',
    experience: '9 Years',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    specialty: 'Bridal Makeup & Styling'
  },
];

export default function Team() {
  return (
    <section id="team" className="py-28 px-6 relative">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-gold-600/5 blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-80 h-80 rounded-full bg-gold-600/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <p className="section-subtitle mb-4">✦ The Experts ✦</p>
          <h2 className="section-title mb-6">Our Team</h2>
          <div className="divider-gold max-w-xs mx-auto mb-8" />
          <p className="font-body text-cream/60 max-w-xl mx-auto text-sm leading-relaxed">
            Our certified professionals bring years of expertise and a passion for beauty to every treatment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="group text-center"
            >
              {/* Image Container */}
              <div className="relative mb-6 mx-auto w-48 h-48 overflow-hidden">
                {/* Decorative ring */}
                <div className="absolute inset-0 rounded-full border border-gold-600/30 group-hover:border-gold-600/60 transition-colors duration-500 z-10" />
                <div className="absolute inset-2 rounded-full border border-gold-600/15 z-10" />
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-onyx/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Info */}
              <h3 className="font-display text-2xl text-cream mb-1">{member.name}</h3>
              <p className="font-accent text-xs tracking-widest uppercase text-gold-600 mb-2">{member.role}</p>
              <p className="font-body text-xs text-cream/50 mb-3">{member.specialty}</p>
              <div className="glass inline-block px-4 py-1.5 rounded-full">
                <span className="text-xs text-cream/70">{member.experience} Experience</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
