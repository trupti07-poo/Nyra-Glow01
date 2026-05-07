import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { getServices, getService, createBooking, getAvailableSlots } from '../utils/api';

export default function BookingPage() {
  const { serviceId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [step, setStep] = useState(1); // 1=service, 2=details, 3=confirm
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    date: '',
    time: '',
  });

  useEffect(() => {
    getServices().then(r => setServices(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    if (serviceId && services.length > 0) {
      const svc = services.find(s => s._id === serviceId);
      if (svc) { setSelectedService(svc); setStep(2); }
    }
  }, [serviceId, services]);

  useEffect(() => {
    if (selectedService && form.date) {
      getAvailableSlots(selectedService._id, form.date)
        .then(r => setAvailableSlots(r.data.available))
        .catch(() => setAvailableSlots(['09:00','10:00','11:00','12:00','14:00','15:00','16:00','17:00','18:00']));
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
    ? selectedService.price + selectedAddOns.reduce((sum, a) => sum + a.price, 0)
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
      toast.success('Booking confirmed! Check your email. ✨');
      navigate('/profile');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  const stepLabels = ['Choose Service', 'Your Details', 'Confirm'];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 relative">
      <div className="absolute inset-0 opacity-5">
        <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920&q=80" alt="" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <Link to="/" className="font-display text-2xl text-gold tracking-[0.2em]">NYRA GLOW</Link>
          <h1 className="section-title mt-4">Book Your <span className="gold-text italic">Experience</span></h1>
          <div className="divider" />
        </motion.div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-0 mb-12">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex items-center">
              <div className={`flex flex-col items-center gap-1 ${i + 1 <= step ? 'opacity-100' : 'opacity-30'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-body border transition-all duration-500 ${i + 1 < step ? 'bg-gold border-gold text-obsidian' : i + 1 === step ? 'border-gold text-gold' : 'border-cream/20 text-cream/30'}`}>
                  {i + 1 < step ? '✓' : i + 1}
                </div>
                <span className="font-body text-[9px] tracking-widest uppercase text-cream/50 whitespace-nowrap">{label}</span>
              </div>
              {i < stepLabels.length - 1 && (
                <div className={`w-16 sm:w-24 h-px mx-3 mb-4 transition-all duration-500 ${i + 1 < step ? 'bg-gold' : 'bg-cream/10'}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Choose Service */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map(svc => (
                  <button
                    key={svc._id}
                    onClick={() => { setSelectedService(svc); setSelectedAddOns([]); setStep(2); }}
                    className="glass rounded-sm overflow-hidden text-left group hover:border-gold/40 transition-all duration-300 border border-transparent"
                  >
                    <img src={svc.image} alt={svc.name} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="p-5">
                      <span className="font-body text-[9px] tracking-widest uppercase text-gold">{svc.category}</span>
                      <h3 className="font-display text-lg text-cream mt-1 mb-2">{svc.name}</h3>
                      <div className="flex items-center gap-3">
                        <span className="font-body text-sm text-gold">₹{svc.price.toLocaleString()}</span>
                        <span className="w-px h-3 bg-gold/30" />
                        <span className="font-body text-xs text-cream/40">{svc.duration}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Details */}
          {step === 2 && selectedService && (
            <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
              {/* Selected service summary */}
              <div className="glass rounded-sm p-5 mb-6 flex gap-4 items-center border border-gold/15">
                <img src={selectedService.image} alt={selectedService.name} className="w-16 h-16 object-cover rounded-sm" />
                <div className="flex-1">
                  <h3 className="font-display text-lg text-cream">{selectedService.name}</h3>
                  <div className="flex gap-3 mt-1">
                    <span className="font-body text-sm text-gold">₹{selectedService.price.toLocaleString()}</span>
                    <span className="font-body text-xs text-cream/40">{selectedService.duration}</span>
                  </div>
                </div>
                <button onClick={() => setStep(1)} className="font-body text-[9px] uppercase tracking-widest text-cream/30 hover:text-gold transition-colors">Change</button>
              </div>

              <div className="glass rounded-sm p-8 space-y-6">
                {/* Add-ons */}
                {selectedService.addOns?.length > 0 && (
                  <div>
                    <h4 className="font-body text-[10px] uppercase tracking-widest text-gold mb-4">Add-ons (Optional)</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {selectedService.addOns.map(addOn => {
                        const isSelected = selectedAddOns.find(a => a.name === addOn.name);
                        return (
                          <button
                            key={addOn.name}
                            onClick={() => toggleAddOn(addOn)}
                            className={`p-3 rounded-sm border text-left transition-all duration-300 ${isSelected ? 'border-gold bg-gold/10 text-gold' : 'border-cream/10 text-cream/60 hover:border-gold/30'}`}
                          >
                            <span className="font-body text-xs block">{addOn.name}</span>
                            <span className="font-body text-xs text-gold/80">+₹{addOn.price}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Form fields */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body text-[10px] tracking-widest uppercase text-gold mb-2">Full Name *</label>
                    <input type="text" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      className="w-full glass px-4 py-3 font-body text-sm text-cream outline-none rounded-sm border border-transparent focus:border-gold/40" />
                  </div>
                  <div>
                    <label className="block font-body text-[10px] tracking-widest uppercase text-gold mb-2">Phone *</label>
                    <input type="tel" required value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      className="w-full glass px-4 py-3 font-body text-sm text-cream outline-none rounded-sm border border-transparent focus:border-gold/40" />
                  </div>
                  <div>
                    <label className="block font-body text-[10px] tracking-widest uppercase text-gold mb-2">Date *</label>
                    <input type="date" required min={today} value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value, time: '' }))}
                      className="w-full glass px-4 py-3 font-body text-sm text-cream outline-none rounded-sm border border-transparent focus:border-gold/40"
                      style={{ colorScheme: 'dark' }} />
                  </div>
                  <div>
                    <label className="block font-body text-[10px] tracking-widest uppercase text-gold mb-2">
                      Time * {form.date && <span className="text-cream/30 normal-case">(available slots)</span>}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(form.date ? availableSlots : ['09:00','10:00','11:00','12:00','14:00','15:00','16:00','17:00','18:00']).map(slot => (
                        <button key={slot} type="button"
                          onClick={() => setForm(p => ({ ...p, time: slot }))}
                          className={`py-2 text-xs font-body rounded-sm border transition-all ${form.time === slot ? 'border-gold bg-gold/20 text-gold' : 'border-cream/10 text-cream/50 hover:border-gold/30'}`}>
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => { if (!form.name || !form.phone || !form.date || !form.time) { toast.error('Fill all fields'); return; } setStep(3); }}
                  className="btn-gold-fill w-full py-4 rounded-sm text-xs tracking-widest"
                >
                  Continue to Review
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && selectedService && (
            <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
              <div className="glass rounded-sm p-8 border border-gold/15">
                <h3 className="font-display text-2xl text-cream mb-8 text-center">Booking Summary</h3>

                <div className="flex gap-4 mb-8 pb-8 border-b border-gold/10">
                  <img src={selectedService.image} alt={selectedService.name} className="w-20 h-20 object-cover rounded-sm" />
                  <div>
                    <span className="font-body text-[9px] uppercase tracking-widest text-gold">{selectedService.category}</span>
                    <h4 className="font-display text-xl text-cream mt-1">{selectedService.name}</h4>
                    <p className="font-body text-xs text-cream/40">{selectedService.duration}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {[
                    { label: 'Name', value: form.name },
                    { label: 'Phone', value: form.phone },
                    { label: 'Date', value: form.date },
                    { label: 'Time', value: form.time },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between py-2 border-b border-cream/5">
                      <span className="font-body text-xs text-cream/40 uppercase tracking-widest">{row.label}</span>
                      <span className="font-body text-sm text-cream">{row.value}</span>
                    </div>
                  ))}

                  {selectedAddOns.map(a => (
                    <div key={a.name} className="flex justify-between py-2 border-b border-cream/5">
                      <span className="font-body text-xs text-cream/40">Add-on: {a.name}</span>
                      <span className="font-body text-sm text-gold">+₹{a.price}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mb-8 p-4 rounded-sm" style={{ background: 'rgba(201,169,110,0.08)' }}>
                  <span className="font-body text-sm text-cream uppercase tracking-widest">Total Amount</span>
                  <span className="font-display text-3xl text-gold">₹{totalPrice.toLocaleString()}</span>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(2)} className="btn-gold flex-1 py-4 text-xs rounded-sm tracking-widest">Edit</button>
                  <button onClick={handleConfirm} disabled={loading} className="btn-gold-fill flex-1 py-4 text-xs rounded-sm tracking-widest disabled:opacity-50">
                    {loading ? 'Confirming...' : 'Confirm Booking'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
