import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { adminGetBookings, adminUpdateBooking, adminGetStats, adminGetUsers, getServices } from '../utils/api';

const statusColors = {
  pending: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  confirmed: 'text-green-400 border-green-400/30 bg-green-400/10',
  cancelled: 'text-red-400 border-red-400/30 bg-red-400/10',
  completed: 'text-gold border-gold/30 bg-gold/10',
};

export default function AdminPage() {
  const [tab, setTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (tab === 'bookings') loadBookings();
  }, [filterStatus, tab]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, bookingsRes, usersRes, servicesRes] = await Promise.all([
        adminGetStats(), adminGetBookings(), adminGetUsers(), getServices()
      ]);
      setStats(statsRes.data);
      setBookings(bookingsRes.data);
      setUsers(usersRes.data);
      setServices(servicesRes.data);
    } catch {
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const loadBookings = async () => {
    try {
      const res = await adminGetBookings(filterStatus ? { status: filterStatus } : {});
      setBookings(res.data);
    } catch {}
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await adminUpdateBooking(id, { status });
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status } : b));
      if (stats) {
        const updated = await adminGetStats();
        setStats(updated.data);
      }
      toast.success(`Booking marked as ${status}`);
    } catch {
      toast.error('Update failed');
    }
  };

  const tabs = ['dashboard', 'bookings', 'users', 'services'];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="section-subtitle">Management Console</p>
          <h1 className="font-display text-4xl text-cream mt-2">Admin <span className="gold-text">Panel</span></h1>
          <div className="w-16 h-px bg-gold/40 mt-4" />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 glass rounded-sm p-1 w-fit flex-wrap">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-sm font-body text-xs uppercase tracking-widest transition-all duration-300 capitalize ${tab === t ? 'bg-gold text-obsidian' : 'text-cream/50 hover:text-gold'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {tab === 'dashboard' && stats && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {[
                { label: 'Total Bookings', value: stats.totalBookings, icon: '📅' },
                { label: 'Pending', value: stats.pendingBookings, icon: '⏳' },
                { label: 'Confirmed', value: stats.confirmedBookings, icon: '✅' },
                { label: 'Completed', value: stats.completedBookings, icon: '✨' },
                { label: 'Total Clients', value: stats.totalUsers, icon: '👤' },
                { label: 'Revenue', value: `₹${(stats.totalRevenue || 0).toLocaleString()}`, icon: '💰' },
              ].map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  className="glass rounded-sm p-6 border border-gold/10">
                  <div className="text-2xl mb-3">{stat.icon}</div>
                  <div className="font-display text-3xl text-gold mb-1">{stat.value}</div>
                  <div className="font-body text-[10px] uppercase tracking-widest text-cream/40">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Recent Bookings preview */}
            <div className="glass rounded-sm p-6 border border-gold/10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-display text-xl text-cream">Recent Bookings</h3>
                <button onClick={() => setTab('bookings')} className="font-body text-xs text-gold hover:underline tracking-widest uppercase">View All</button>
              </div>
              <div className="space-y-3">
                {bookings.slice(0, 5).map(b => (
                  <div key={b._id} className="flex items-center justify-between py-3 border-b border-cream/5">
                    <div>
                      <span className="font-body text-sm text-cream">{b.name}</span>
                      <span className="font-body text-xs text-cream/40 ml-3">{b.service?.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-body text-xs text-cream/40">{b.date} {b.time}</span>
                      <span className={`font-body text-[9px] uppercase tracking-widest px-2 py-1 rounded-full border ${statusColors[b.status]}`}>{b.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Bookings Tab */}
        {tab === 'bookings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Filter */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {['', 'pending', 'confirmed', 'completed', 'cancelled'].map(s => (
                <button key={s} onClick={() => setFilterStatus(s)}
                  className={`font-body text-[10px] uppercase tracking-widest px-4 py-2 rounded-sm border transition-all ${filterStatus === s ? 'border-gold bg-gold/20 text-gold' : 'border-cream/10 text-cream/40 hover:border-gold/30'}`}>
                  {s || 'All'}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {bookings.map((b, i) => (
                <motion.div key={b._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="glass rounded-sm p-5 border border-gold/10">
                  <div className="flex flex-wrap gap-4 items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-2">
                        <h4 className="font-display text-lg text-cream">{b.name}</h4>
                        <span className={`font-body text-[9px] uppercase tracking-widest px-2 py-1 rounded-full border ${statusColors[b.status]}`}>{b.status}</span>
                      </div>
                      <div className="font-body text-xs text-cream/40 space-y-1">
                        <p>📞 {b.phone} · ✉ {b.user?.email}</p>
                        <p>💆 {b.service?.name} · 📅 {b.date} at {b.time}</p>
                        <p className="text-gold">₹{b.totalPrice?.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {['pending', 'confirmed', 'completed', 'cancelled'].filter(s => s !== b.status).map(s => (
                        <button key={s} onClick={() => updateStatus(b._id, s)}
                          className="font-body text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-sm border border-cream/10 text-cream/40 hover:border-gold/40 hover:text-gold transition-all capitalize">
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
              {bookings.length === 0 && (
                <div className="glass rounded-sm p-12 text-center">
                  <p className="font-display text-xl text-cream/30">No bookings found</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Users Tab */}
        {tab === 'users' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="glass rounded-sm overflow-hidden border border-gold/10">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gold/10">
                    {['Name', 'Email', 'Phone', 'Joined'].map(h => (
                      <th key={h} className="text-left px-5 py-4 font-body text-[9px] uppercase tracking-widest text-gold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={u._id} className={`border-b border-cream/5 ${i % 2 === 0 ? '' : 'bg-white/2'}`}>
                      <td className="px-5 py-4 font-body text-sm text-cream">{u.name}</td>
                      <td className="px-5 py-4 font-body text-xs text-cream/50">{u.email}</td>
                      <td className="px-5 py-4 font-body text-xs text-cream/50">{u.phone || '—'}</td>
                      <td className="px-5 py-4 font-body text-xs text-cream/40">{new Date(u.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {users.length === 0 && <p className="text-center py-12 font-body text-sm text-cream/30">No users yet</p>}
            </div>
          </motion.div>
        )}

        {/* Services Tab */}
        {tab === 'services' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((s, i) => (
                <motion.div key={s._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  className="glass rounded-sm overflow-hidden border border-gold/10">
                  <img src={s.image} alt={s.name} className="w-full h-36 object-cover" />
                  <div className="p-5">
                    <span className="font-body text-[9px] uppercase tracking-widest text-gold">{s.category}</span>
                    <h4 className="font-display text-lg text-cream mt-1">{s.name}</h4>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="font-body text-sm text-gold">₹{s.price.toLocaleString()}</span>
                      <span className="font-body text-xs text-cream/40">{s.duration}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
