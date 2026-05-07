import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const team = [
  { name: 'Priya Sharma',  role: 'Master Esthetician',       experience: '12 Years', specialty: 'Advanced Facials & Skin Treatments', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face&q=80' },
  { name: 'Aanya Kapoor',  role: 'Senior Massage Therapist', experience: '9 Years',  specialty: 'Hot Stone & Deep Tissue Massage',   image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face&q=80' },
  { name: 'Riya Menon',    role: 'Bridal Makeup Artist',     experience: '8 Years',  specialty: 'Bridal & Editorial Makeup',          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face&q=80' },
  { name: 'Sneha Nair',    role: 'Hair Specialist',           experience: '10 Years', specialty: 'Keratin, Color & Styling',           image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face&q=80' },
];

export default function TeamSection() {
  const { isDark } = useTheme();
  const secBg = isDark ? '#0F0F0F' : '#F5F0E8';
  const text  = isDark ? '#F5F0E8' : '#111111';
  const muted = isDark ? 'rgba(245,240,232,0.55)' : '#444444';
  const role  = isDark ? '#C9A96E' : '#8B6914';

  return (
    <section id="team" className="py-28 px-6" style={{ background: secBg }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="section-subtitle mb-4">Meet The Experts</p>
          <h2 className="section-title">Our <span className="gold-text italic">Team</span></h2>
          <div className="divider" />
          <p className="font-body text-sm max-w-md mx-auto leading-relaxed mt-4" style={{ color: muted }}>
            Passionate artisans dedicated to the craft of beauty and wellness.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {team.map((member, i) => (
            <motion.div key={member.name}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group text-center">

              <div className="relative mb-6 mx-auto overflow-hidden rounded-full transition-all duration-500"
                style={{ width:'176px', height:'176px', border:'2px solid rgba(201,169,110,0.25)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(201,169,110,0.8)'; e.currentTarget.style.boxShadow='0 0 30px rgba(201,169,110,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(201,169,110,0.25)'; e.currentTarget.style.boxShadow='none'; }}>
                <img src={member.image} alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = 'linear-gradient(135deg, #8B6914, #C9A96E)';
                    e.target.parentElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:3rem;color:#FAF7F0;">${member.name.charAt(0)}</div>`;
                  }} />
              </div>

              <h3 className="font-display text-xl mb-1 transition-colors duration-300" style={{ color: text }}
                onMouseEnter={e => e.currentTarget.style.color = '#C9A96E'}
                onMouseLeave={e => e.currentTarget.style.color = text}>
                {member.name}
              </h3>
              <p className="font-body text-[10px] tracking-widest uppercase mb-2 font-semibold" style={{ color: role }}>{member.role}</p>
              <p className="font-body text-xs font-medium" style={{ color: muted }}>{member.specialty}</p>

              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="w-5 h-px" style={{ background:'rgba(201,169,110,0.4)' }} />
                <span className="font-body text-[10px] tracking-widest font-medium" style={{ color: muted }}>{member.experience}</span>
                <div className="w-5 h-px" style={{ background:'rgba(201,169,110,0.4)' }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}