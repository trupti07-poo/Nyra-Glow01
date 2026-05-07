const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const { protect } = require('../middleware/auth');
const { sendBookingEmail, sendConfirmationEmail } = require('../utils/email');

// POST /api/bookings
router.post('/', protect, async (req, res) => {
  try {
    const { serviceId, name, phone, date, time, addOns } = req.body;

    if (!serviceId || !name || !phone || !date || !time)
      return res.status(400).json({ message: 'All fields are required' });

    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    // Check double booking
    const conflict = await Booking.findOne({ service: serviceId, date, time, status: { $ne: 'cancelled' } });
    if (conflict) return res.status(409).json({ message: 'This time slot is already booked. Please choose another time.' });

    const addOnTotal = (addOns || []).reduce((sum, a) => sum + (a.price || 0), 0);
    const totalPrice = service.price + addOnTotal;

    const booking = await Booking.create({
      user: req.user._id,
      service: serviceId,
      name, phone, date, time,
      addOns: addOns || [],
      totalPrice
    });

    await booking.populate('service');

    // Send emails
    await sendBookingEmail(booking, service, req.user);
    await sendConfirmationEmail(booking, service, req.user.email);

    res.status(201).json({ message: 'Booking confirmed!', booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/bookings (user's own bookings)
router.get('/', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('service', 'name category price duration image')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/bookings/available - check available slots
router.get('/available', async (req, res) => {
  try {
    const { serviceId, date } = req.query;
    const allSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
    const booked = await Booking.find({ service: serviceId, date, status: { $ne: 'cancelled' } }).select('time');
    const bookedTimes = booked.map(b => b.time);
    const available = allSlots.filter(s => !bookedTimes.includes(s));
    res.json({ available, booked: bookedTimes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/bookings/:id/cancel
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    booking.status = 'cancelled';
    await booking.save();
    res.json({ message: 'Booking cancelled', booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
