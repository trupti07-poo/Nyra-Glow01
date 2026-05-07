const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');

// GET /api/admin/bookings
router.get('/bookings', protect, adminOnly, async (req, res) => {
  try {
    const { status, date } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (date) filter.date = date;
    const bookings = await Booking.find(filter)
      .populate('user', 'name email phone')
      .populate('service', 'name category price duration')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/admin/bookings/:id
router.put('/bookings/:id', protect, adminOnly, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('user', 'name email')
      .populate('service', 'name');
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/admin/stats
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    const completedBookings = await Booking.countDocuments({ status: 'completed' });
    const totalUsers = await User.countDocuments({ isAdmin: false });
    const revenue = await Booking.aggregate([
      { $match: { status: { $in: ['confirmed', 'completed'] } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    res.json({
      totalBookings, pendingBookings, confirmedBookings,
      completedBookings, totalUsers,
      totalRevenue: revenue[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/admin/users
router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false }).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
