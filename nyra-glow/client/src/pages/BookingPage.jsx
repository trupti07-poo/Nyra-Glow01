import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { getServices, createBooking, getAvailableSlots } from '../utils/api';

export default function BookingPage() {
  const { serviceId } = useParams();
  const { user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    date: '',
    time: '',
  });

  // 🎯 THEME FIX (IMPORTANT)
  const textMain = isDark ? 'text-cream' : 'text-gray-900';
  const textSub = isDark ? 'text-cream/60' : 'text-gray-600';
  const textMuted = isDark ? 'text-cream/40' : 'text-gray-500';
  const border = isDark ? 'border-cream/10' : 'border-gray-200';
  const bg = isDark ? 'bg-obsidian' : 'bg-[#faf7f0]';

  useEffect(() => {
    getServices().then(r => setServices(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    if (serviceId && services.length > 0) {
      const svc = services.find(s => s._id === serviceId);
      if (svc) {
        setSelectedService(svc);
        setStep(2);
      }
    }
  }, [serviceId, services]);

  useEffect(() => {
    if (selectedService && form.date) {
      getAvailableSlots(selectedService._id, form.date)
        .then(r => setAvailableSlots(r.data.available))
        .catch(() =>
          setAvailableSlots([
            '09:00','10:00','11:00','12:00',
            '14:00','15:00','16:00','17:00','18:00'
          ])
        );
    }
  }, [selectedService, form.date]);

  const toggleAddOn = (addOn) => {
    setSelectedAddOns(prev =>
      prev.find(a => a.name === addOn.name)
        ? prev.filter(a => a.name !== addOn.name)
        : [...prev, addOn]
    );
  };

  const totalPrice = selectedService
    ? selectedService.price +
      selectedAddOns.reduce((sum, a) => sum + a.price, 0)
    : 0;

  const handleConfirm = async () => {
    if (!form.name || !form.phone || !form.date || !form.time) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      await createBooking({
        serviceId: selectedService._id,
        name: form.name,
        phone: form.phone,
        date: form.date,
        time: form.time,
        addOns: selectedAddOns,
      });

      toast.success('Booking confirmed! ✨');
      navigate('/profile');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  const stepLabels = ['Choose Service', 'Your Details', 'Confirm'];

  return (
    <div className={`min-h-screen pt-24 pb-16 px-6 relative ${bg}`}>

      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <img
          src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920&q=80"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <Link className="font-display text-2xl text-gold tracking-[0.2em]">
            NYRA GLOW
          </Link>

          <h1 className={`mt-4 font-display text-3xl ${textMain}`}>
            Book Your <span className="gold-text italic">Experience</span>
          </h1>
        </div>

        {/* Steps */}
        <div className="flex justify-center mb-10 gap-3">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex items-center">
              <div className={`w-8 h-8 flex items-center justify-center rounded-full border text-xs
                ${i + 1 <= step ? 'border-gold text-gold' : border + ' ' + textMuted}`}>
                {i + 1}
              </div>
              <span className={`ml-2 text-[10px] uppercase ${textMuted}`}>
                {label}
              </span>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* STEP 1 */}
          {step === 1 && (
            <motion.div>
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map(svc => (
                  <button
                    key={svc._id}
                    onClick={() => {
                      setSelectedService(svc);
                      setStep(2);
                    }}
                    className={`border rounded-sm overflow-hidden text-left ${border}`}
                  >
                    <img src={svc.image} className="h-36 w-full object-cover" />
                    <div className="p-4">
                      <h3 className={textMain}>{svc.name}</h3>
                      <p className={textSub}>₹{svc.price}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 2 && selectedService && (
            <motion.div>

              <div className={`p-4 mb-6 border rounded ${border}`}>
                <h3 className={textMain}>{selectedService.name}</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">

                <input
                  placeholder="Name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className={`p-3 border rounded ${border} ${textMain} bg-transparent`}
                />

                <input
                  placeholder="Phone"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className={`p-3 border rounded ${border} ${textMain} bg-transparent`}
                />

                <input
                  type="date"
                  value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                  className={`p-3 border rounded ${border} ${textMain} bg-transparent`}
                />

              </div>

              <button
                onClick={() => setStep(3)}
                className="mt-6 w-full bg-gold text-black py-3"
              >
                Continue
              </button>

            </motion.div>
          )}

          {/* STEP 3 */}
          {step === 3 && selectedService && (
            <motion.div className={`border p-6 rounded ${border}`}>

              <h2 className={textMain}>Confirm Booking</h2>

              <p className={textSub}>Total: ₹{totalPrice}</p>

              <button
                onClick={handleConfirm}
                disabled={loading}
                className="w-full mt-6 bg-gold text-black py-3"
              >
                {loading ? 'Booking...' : 'Confirm'}
              </button>

            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}