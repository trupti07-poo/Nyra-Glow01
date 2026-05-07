import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMyBookings, cancelBooking, updateProfile } from '../utils/api';

const statusColors = {
  pending: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  confirmed: 'text-green-400 border-green-400/30 bg-green-400/10',
  cancelled: 'text-red-400 border-red-400/30 bg-red-400/10',
  completed: 'text-gold border-gold/30 bg-gold/10',
};

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('bookings');
  const [profileForm, setProfileForm] = useState({ name: user?.name || '', phone: user?.phone || '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMyBookings()
      .then(r => setBookings(r.data))
      .catch(() => toast.error('Failed to load bookings'));
  }, []);

  const handleCancel = async (id) => {
    if (!confirm('Cancel this appointment?')) return;
    try {
      await cancelBooking(id);
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status: 'cancelled' } : b));
      toast.success('Appointment cancelled');
    } catch (err) {
      toast.error('Failed to cancel booking');
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(profileForm);
      toast.success('Profile updated ✨');
    } catch {
      toast.error('Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="section-subtitle">My Account</p>
              <h1 className="font-display text-4xl text-cream mt-2">
                Welcome, <span className="gold-text">{user?.name?.split(' ')[0]}</span>
              </h1>
            </div>
            <button onClick={logout} className="btn-gold text-[10px] px-5 py-2 rounded-sm">Logout</button>
          </div>
          <div className="w-16 h-px bg-gold/40 mt-4" />
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 glass rounded-sm p-1 w-fit">
          {['bookings', 'profile'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-sm font-body text-xs uppercase tracking-widest transition-all duration-300 ${
                activeTab === tab ? 'bg-gold text-obsidian' : 'text-cream/50 hover:text-gold'
              }`}
            >
              {tab === 'bookings' ? `My Bookings (${bookings.length})` : 'Profile'}
            </button>
          ))}
        </div>

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {bookings.length === 0 ? (
              <div className="glass rounded-sm p-16 text-center">
                <div className="text-6xl mb-4 opacity-20">✦</div>
                <p className="font-display text-2xl text-cream/40 mb-2">No bookings yet</p>
                <p className="font-body text-sm text-cream/30 mb-6">Start your glow journey today</p>
                <Link to="/book" className="btn-gold-fill text-xs px-8 py-3 rounded-sm inline-block">Book Now</Link>
              </div>
            ) : bookings.map((booking, i) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-sm p-6 flex gap-4 items-start border border-gold/10"
              >
                {booking.service?.image && (
                  <img src={booking.service.image} alt={booking.service.name} className="w-16 h-16 object-cover rounded-sm flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h3 className="font-display text-lg text-cream">{booking.service?.name || 'Service'}</h3>
                      <p className="font-body text-xs text-cream/40 mt-1">
                        {booking.date} at {booking.time} · {booking.service?.duration}
                      </p>
                    </div>
                    <span className={`font-body text-[9px] uppercase tracking-widest px-3 py-1 rounded-full border ${statusColors[booking.status]}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-display text-lg text-gold">₹{booking.totalPrice?.toLocaleString()}</span>
                    {booking.status === 'pending' && (
                      <button onClick={() => handleCancel(booking._id)} className="font-body text-[10px] uppercase tracking-widest text-red-400/60 hover:text-red-400 transition-colors">
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <form onSubmit={handleProfileUpdate} className="glass rounded-sm p-8 space-y-6 max-w-md">
              <div>
                <label className="block font-body text-[10px] tracking-widest uppercase text-gold mb-2">Full Name</label>
                <input
                  type="text" value={profileForm.name}
                  onChange={e => setProfileForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full glass px-4 py-3 font-body text-sm text-cream outline-none rounded-sm border border-transparent focus:border-gold/40"
                />
              </div>
              <div>
                <label className="block font-body text-[10px] tracking-widest uppercase text-gold mb-2">Email</label>
                <input type="email" value={user?.email} disabled
                  className="w-full glass px-4 py-3 font-body text-sm text-cream/40 outline-none rounded-sm cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block font-body text-[10px] tracking-widest uppercase text-gold mb-2">Phone</label>
                <input
                  type="tel" value={profileForm.phone}
                  onChange={e => setProfileForm(p => ({ ...p, phone: e.target.value }))}
                  className="w-full glass px-4 py-3 font-body text-sm text-cream outline-none rounded-sm border border-transparent focus:border-gold/40"
                />
              </div>
              <button type="submit" disabled={loading} className="btn-gold-fill w-full py-3 rounded-sm text-xs tracking-widest disabled:opacity-50">
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}
