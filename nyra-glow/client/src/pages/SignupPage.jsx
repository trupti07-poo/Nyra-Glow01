import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function SignupPage() {
  const [form, setForm]       = useState({ name:'', email:'', phone:'', password:'', confirm:'' });
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const { isDark } = useTheme();
  const navigate   = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirm) { toast.error('Passwords do not match'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      await signup(form.name, form.email, form.phone, form.password);
      toast.success('Welcome to Nyra Glow! ✨');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    } finally { setLoading(false); }
  };

  const bg      = isDark ? '#0A0A0A' : '#FAF7F0';
  const cardBg  = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.85)';
  const border  = 'rgba(201,169,110,0.18)';
  const text    = isDark ? '#F5F0E8' : '#1A1A1A';
  const muted   = isDark ? 'rgba(245,240,232,0.4)' : 'rgba(26,26,26,0.45)';
  const inputBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.9)';
  const inputStyle = { width:'100%', padding:'12px 16px', fontFamily:'"DM Sans",sans-serif', fontSize:'0.875rem', color:text, background:inputBg, border:`1px solid ${border}`, borderRadius:'2px', outline:'none' };

  const fields = [
    { name:'name',     label:'Full Name',        type:'text',     placeholder:'Your full name',    required:true },
    { name:'email',    label:'Email Address',     type:'email',    placeholder:'your@email.com',    required:true },
    { name:'phone',    label:'Phone Number',      type:'tel',      placeholder:'+91 XXXXX XXXXX',   required:false },
    { name:'password', label:'Password',          type:'password', placeholder:'Min. 6 characters', required:true },
    { name:'confirm',  label:'Confirm Password',  type:'password', placeholder:'Repeat password',   required:true },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden" style={{ background: bg }}>
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1920&q=80" alt=""
          className="w-full h-full object-cover" style={{ opacity: isDark ? 0.12 : 0.08 }} />
      </div>

      <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}
        className="relative z-10 rounded-sm p-10 w-full max-w-md"
        style={{ background:cardBg, backdropFilter:'blur(24px)', border:`1px solid ${border}` }}>

        <div className="text-center mb-10">
          <Link to="/" className="font-display text-3xl tracking-[0.2em]" style={{ color:'#C9A96E' }}>NYRA GLOW</Link>
          <p className="font-body text-xs tracking-widest uppercase mt-2" style={{ color: muted }}>Create Your Account</p>
          <div className="w-12 h-px mx-auto mt-4" style={{ background:'linear-gradient(90deg, transparent, #C9A96E, transparent)' }} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(f => (
            <div key={f.name}>
              <label className="block font-body text-[10px] tracking-widest uppercase mb-2" style={{ color:'#C9A96E' }}>{f.label}</label>
              <input type={f.type} required={f.required} value={form[f.name]}
                onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                placeholder={f.placeholder} style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#C9A96E'}
                onBlur={e => e.target.style.borderColor = border} />
            </div>
          ))}
          <button type="submit" disabled={loading} className="btn-gold-fill w-full py-4 rounded-sm tracking-widest mt-2"
            style={{ opacity: loading ? 0.6 : 1 }}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center font-body text-xs mt-8" style={{ color: muted }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color:'#C9A96E' }} className="hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
