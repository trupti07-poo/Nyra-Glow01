const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  fullDescription: { type: String, default: '' },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  image: { type: String, required: true },
  addOns: [{ name: String, price: Number }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Service', serviceSchema);
