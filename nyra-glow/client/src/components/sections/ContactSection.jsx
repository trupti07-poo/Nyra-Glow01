import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { getServices, createBooking } from '../../utils/api';

const fallbackServices = [
  { _id: '1', name: 'Signature Facial',      price: 2499, duration: '75 mins' },
  { _id: '2', name: 'Hot Stone Massage',      price: 3299, duration: '90 mins' },
  { _id: '3', name: 'Bridal Glow Package',    price: 7999, duration: '180 mins' },
  { _id: '4', name: 'Keratin Treatment',      price: 4999, duration: '120 mins' },
  { _id: '5', name: 'Luxury Mani & Pedi',     price: 1999, duration: '60 mins' },
  { _id: '6', name: 'Aromatherapy Body Wrap', price: 2799, duration: '90 mins' },
];

const timings = [
  { day: 'Monday – Friday', hours: '9:00 AM – 7:00 PM' },
  { day: 'Saturday',         hours: '9:00 AM – 8:00 PM' },
  { day: 'Sunday',           hours: '10:00 AM – 6:00 PM' },
];

const timeSlots = ['09:00','10:00','11:00','12:00','14:00','15:00','16:00','17:00','18:00'];

export default function ContactSection() {
  const [services, setServices] = useState(fallbackServices);
  const [form, setForm]         = useState({ name:'', phone:'', service:'', date:'', time:'' });
  const [loading, setLoading]   = useState(false);
  const { user }   = useAuth();
  const { isDark } = useTheme();
  const navigate   = useNavigate();

  useEffect(() => {
    getServices()
      .then(r => { if (r.data && r.data.length > 0) setServices(r.data); })
      .catch(() => setServices(fallbackServices));
  }, []);

  const ch = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const today = new Date().toISOString().split('T')[0];

  const secBg   = isDark ? '#0A0A0A' : '#FAF7F0';
  const cardBg  = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.75)';
  const border  = 'rgba(201,169,110,0.15)';
  const inputBg = isDark ? '#111111' : '#FFFFFF';
  const text    = isDark ? '#F5F0E8' : '#1A1A1A';
  const muted   = isDark ? 'rgba(245,240,232,0.45)' : 'rgba(26,26,26,0.45)';

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '0.875rem',
    color: text,
    background: inputBg,
    border: `1px solid ${border}`,
    borderRadius: '2px',
    outline: 'none',
    transition: 'border-color 0.3s',
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!user) { toast.error('Please login to book'); navigate('/login'); return; }
    if (!form.service || !form.date || !form.time) { toast.error('Fill all required fields'); return; }
    setLoading(true);
    try {
      await createBooking({
        serviceId: form.service,
        name: form.name || user.name,
        phone: form.phone,
        date: form.date,
        time: form.time,
      });
      toast.success('Appointment confirmed! ✨');
      setForm({ name:'', phone:'', service:'', date:'', time:'' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed. Try again.');
    } finally { setLoading(false); }
  };

  return (
    <section id="contact" className="py-28 px-6" style={{ background: secBg }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="section-subtitle mb-4">Reserve Your Moment</p>
          <h2 className="section-title">Book An <span className="gold-text italic">Appointment</span></h2>
          <div className="divider" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}>
            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-body text-[10px] tracking-widest uppercase mb-2" style={{ color:'#C9A96E' }}>Full Name *</label>
                  <input name="name" value={form.name} onChange={ch} required
                    placeholder="Your name" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#C9A96E'}
                    onBlur={e => e.target.style.borderColor = border} />
                </div>
                <div>
                  <label className="block font-body text-[10px] tracking-widets uppercase mb-2" style={{ color:'#C9A96E' }}>Phone *</label>
                  <input name="phone" value={form.phone} onChange={ch} required
                    placeholder="+91 XXXXX XXXXX" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#C9A96E'}
                    onBlur={e => e.target.style.borderColor = border} />
                </div>
              </div>

              {/* Service Dropdown */}
              <div>
                <label className="block font-body text-[10px] tracking-widest uppercase mb-2" style={{ color:'#C9A96E' }}>Select Service *</label>
                <select name="service" value={form.service} onChange={ch} required
                  style={{ ...inputStyle, background: inputBg, cursor: 'pointer' }}>
                  <option value="" style={{ background: inputBg, color: text }}>-- Choose a service --</option>
                  {services.map(s => (
                    <option key={s._id} value={s._id} style={{ background: inputBg, color: text }}>
                      {s.name} — ₹{s.price?.toLocaleString()} ({s.duration})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-body text-[10px] tracking-widest uppercase mb-2" style={{ color:'#C9A96E' }}>Date *</label>
                  <input type="date" name="date" value={form.date} onChange={ch}
                    min={today} required
                    style={{ ...inputStyle, colorScheme: isDark ? 'dark' : 'light' }}
                    onFocus={e => e.target.style.borderColor = '#C9A96E'}
                    onBlur={e => e.target.style.borderColor = border} />
                </div>
                <div>
                  <label className="block font-body text-[10px] tracking-widest uppercase mb-2" style={{ color:'#C9A96E' }}>Time *</label>
                  <select name="time" value={form.time} onChange={ch} required
                    style={{ ...inputStyle, background: inputBg, cursor: 'pointer' }}>
                    <option value="" style={{ background: inputBg, color: text }}>-- Select time --</option>
                    {timeSlots.map(t => (
                      <option key={t} value={t} style={{ background: inputBg, color: text }}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="btn-gold-fill w-full py-4 rounded-sm tracking-widest"
                style={{ opacity: loading ? 0.6 : 1 }}>
                {loading ? 'Confirming...' : user ? 'Confirm Appointment' : 'Login to Book'}
              </button>

              {!user && (
                <p className="font-body text-xs text-center" style={{ color: muted }}>
                  <button type="button" onClick={() => navigate('/login')} style={{ color:'#C9A96E' }} className="hover:underline">Login</button>
                  {' or '}
                  <button type="button" onClick={() => navigate('/signup')} style={{ color:'#C9A96E' }} className="hover:underline">Sign up</button>
                  {' to book your appointment'}
                </p>
              )}
            </form>
          </motion.div>

          {/* Info Panel */}
          <motion.div initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.8 }} className="space-y-6">
            <div className="rounded-sm overflow-hidden" style={{ height: 240, border:`1px solid ${border}` }}>
              <iframe
                title="Nyra Glow Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.22!2d76.6393!3d12.2958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDE3JzQ0LjkiTiA3NsKwMzgnMjEuNSJF!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%" height="100%"
                style={{ border: 0, filter: isDark ? 'invert(90%) hue-rotate(180deg)' : 'none' }}
                allowFullScreen loading="lazy" />
            </div>

            <div className="rounded-sm p-6 space-y-5"
              style={{ background: cardBg, border:`1px solid ${border}`, backdropFilter:'blur(20px)' }}>
              <div>
                <h4 className="font-body text-[10px] tracking-widest uppercase mb-3" style={{ color:'#C9A96E' }}>Location</h4>
                <p className="font-body text-sm leading-relaxed" style={{ color: muted }}>
                  Nyra Glow Spa & Salon<br />
                  12, Palace Road, Chamrajpura<br />
                  Mysuru, Karnataka — 570024
                </p>
              </div>

              <div style={{ borderTop:`1px solid ${border}`, paddingTop:'20px' }}>
                <h4 className="font-body text-[10px] tracking-widest uppercase mb-3" style={{ color:'#C9A96E' }}>Salon Timings</h4>
                {timings.map(t => (
                  <div key={t.day} className="flex justify-between mb-2">
                    <span className="font-body text-xs" style={{ color: muted }}>{t.day}</span>
                    <span className="font-body text-xs font-medium" style={{ color: text }}>{t.hours}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop:`1px solid ${border}`, paddingTop:'20px' }}>
                <h4 className="font-body text-[10px] tracking-widest uppercase mb-3" style={{ color:'#C9A96E' }}>Contact</h4>
                <a href="tel:+919353231012" className="block font-body text-sm mb-1 transition-colors" style={{ color: muted }}
                  onMouseEnter={e => e.currentTarget.style.color = '#C9A96E'}
                  onMouseLeave={e => e.currentTarget.style.color = muted}>+91 93532 31012</a>
                <a href="mailto:hello@nyraglow.com" className="block font-body text-sm transition-colors" style={{ color: muted }}
                  onMouseEnter={e => e.currentTarget.style.color = '#C9A96E'}
                  onMouseLeave={e => e.currentTarget.style.color = muted}>hello@nyraglow.com</a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}