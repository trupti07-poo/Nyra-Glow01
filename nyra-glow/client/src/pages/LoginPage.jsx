import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function LoginPage() {
  const [form, setForm]     = useState({ email:'', password:'' });
  const [loading, setLoading] = useState(false);
  const { login }  = useAuth();
  const { isDark } = useTheme();
  const navigate   = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true);
    try {
      const user = await login(form.email, form.password);
      toast.success(`Welcome back, ${user.name.split(' ')[0]}! ✨`);
      navigate(user.isAdmin ? '/admin' : '/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  const bg     = isDark ? '#0A0A0A' : '#FAF7F0';
  const cardBg = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.85)';
  const border = 'rgba(201,169,110,0.18)';
  const text   = isDark ? '#F5F0E8' : '#1A1A1A';
  const muted  = isDark ? 'rgba(245,240,232,0.4)' : 'rgba(26,26,26,0.45)';
  const inputBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.9)';

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden" style={{ background: bg }}>
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80" alt=""
          className="w-full h-full object-cover" style={{ opacity: isDark ? 0.15 : 0.1 }} />
      </div>

      <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}
        className="relative z-10 rounded-sm p-10 w-full max-w-md"
        style={{ background: cardBg, backdropFilter:'blur(24px)', border:`1px solid ${border}` }}>

        <div className="text-center mb-10">
          <Link to="/" className="font-display text-3xl tracking-[0.2em]" style={{ color:'#C9A96E' }}>NYRA GLOW</Link>
          <p className="font-body text-xs tracking-widest uppercase mt-2" style={{ color: muted }}>Welcome Back</p>
          <div className="w-12 h-px mx-auto mt-4" style={{ background:'linear-gradient(90deg, transparent, #C9A96E, transparent)' }} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {[{ name:'email', label:'Email', type:'email', placeholder:'your@email.com' },
            { name:'password', label:'Password', type:'password', placeholder:'••••••••' }].map(f => (
            <div key={f.name}>
              <label className="block font-body text-[10px] tracking-widest uppercase mb-2" style={{ color:'#C9A96E' }}>{f.label}</label>
              <input type={f.type} required value={form[f.name]}
                onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                placeholder={f.placeholder}
                style={{ width:'100%', padding:'12px 16px', fontFamily:'"DM Sans",sans-serif', fontSize:'0.875rem', color: text, background: inputBg, border:`1px solid ${border}`, borderRadius:'2px', outline:'none' }}
                onFocus={e => e.target.style.borderColor = '#C9A96E'}
                onBlur={e => e.target.style.borderColor = border} />
            </div>
          ))}
          <button type="submit" disabled={loading} className="btn-gold-fill w-full py-4 rounded-sm tracking-widest mt-2"
            style={{ opacity: loading ? 0.6 : 1 }}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center font-body text-xs mt-8" style={{ color: muted }}>
          New to Nyra Glow?{' '}
          <Link to="/signup" style={{ color:'#C9A96E' }} className="hover:underline">Create an account</Link>
        </p>
      </motion.div>
    </div>
  );
}
