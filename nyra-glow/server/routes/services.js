const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { protect, adminOnly } = require('../middleware/auth');

// GET /api/services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ isActive: true });
    if (services.length === 0) {
      // Seed default services if empty
      const defaults = getDefaultServices();
      await Service.insertMany(defaults);
      const seeded = await Service.find({ isActive: true });
      return res.json(seeded);
    }
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/services/:id
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/services (admin)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/services/:id (admin)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/services/:id (admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Service.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: 'Service deactivated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

function getDefaultServices() {
  return [
    {
      name: 'Signature Facial',
      category: 'Facial',
      description: 'Deep cleansing facial with premium serums and LED therapy for radiant skin.',
      fullDescription: 'Our Signature Facial is a luxurious 75-minute journey to radiant skin. We begin with a thorough double-cleanse using our botanical milk cleanser, followed by gentle exfoliation. A customized enzyme mask targets your specific skin concerns, while our expert estheticians perform a relaxing facial massage using rose quartz rollers. The treatment concludes with high-frequency LED therapy and our signature serum application. Your skin will emerge luminous, firmed, and deeply nourished.',
      price: 2499,
      duration: '75 mins',
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80',
      addOns: [{ name: 'Collagen Booster', price: 500 }, { name: 'Jade Roller Massage', price: 350 }]
    },
    {
      name: 'Hot Stone Massage',
      category: 'Massage',
      description: 'Therapeutic full-body massage using heated basalt stones to melt deep muscle tension.',
      fullDescription: 'Experience the ancient healing power of volcanic basalt stones combined with our master therapists skilled hands. Smooth, heated stones are placed along energy meridians while warm oil is worked into tired muscles, releasing months of accumulated tension. This 90-minute treatment improves circulation, reduces chronic pain, and induces profound relaxation. The perfect antidote to modern stress.',
      price: 3299,
      duration: '90 mins',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
      addOns: [{ name: 'Aromatherapy Upgrade', price: 400 }, { name: 'Scalp Treatment', price: 600 }]
    },
    {
      name: 'Bridal Glow Package',
      category: 'Bridal',
      description: 'Complete pre-wedding beauty ritual — hair, skin, and body prepared for your perfect day.',
      fullDescription: 'Our Bridal Glow Package is the ultimate pre-wedding beauty ritual designed to make you radiate confidence on your special day. This 3-hour luxury experience includes a deep conditioning hair mask, full body exfoliation with our signature rose-gold scrub, a brightening facial, eyebrow threading and tinting, professional makeup application, and a glass of sparkling wine. Bring your bridesmaids — group packages available.',
      price: 7999,
      duration: '180 mins',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80',
      addOns: [{ name: 'Trial Makeup Session', price: 2000 }, { name: 'Mehndi Application', price: 1500 }]
    },
    {
      name: 'Keratin Hair Treatment',
      category: 'Hair',
      description: 'Brazilian keratin smoothing for silky, frizz-free hair lasting up to 4 months.',
      fullDescription: 'Transform your hair with our professional Brazilian Keratin Treatment. This intensive smoothing system penetrates each strand with keratin proteins, eliminating frizz and adding mirror-like shine. Our colorists apply the formula, then seal it with controlled heat to lock in the treatment. Results last 3-4 months with proper care. Suitable for all hair types. Aftercare kit included.',
      price: 4999,
      duration: '120 mins',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
      addOns: [{ name: 'Toning Treatment', price: 800 }, { name: 'Deep Conditioning Mask', price: 600 }]
    },
    {
      name: 'Luxury Manicure & Pedicure',
      category: 'Nails',
      description: 'Gel nail artistry with hot paraffin treatment and massage for hands and feet.',
      fullDescription: 'Indulge your hands and feet with our most luxurious nail care ritual. We begin with a warm milk soak, followed by cuticle care and shaping. A hot paraffin wax treatment seals in moisture while you enjoy a pressure-point massage. Choose from our curated collection of premium gel polishes, and let our nail artists create stunning designs if desired. Your nails will be salon-perfect for up to three weeks.',
      price: 1999,
      duration: '60 mins',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80',
      addOns: [{ name: 'Nail Art Design', price: 500 }, { name: 'Paraffin Upgrade', price: 300 }]
    },
    {
      name: 'Aromatherapy Body Wrap',
      category: 'Body',
      description: 'Detoxifying body wrap with essential oils to purify, soften, and rejuvenate skin.',
      fullDescription: 'Our Aromatherapy Body Wrap is a full-body detoxification experience. We begin by dry brushing to stimulate circulation and remove dead skin cells. A warm, aromatic mask of seaweed, clay, and essential oils is then applied to your entire body, which is wrapped in thermal blankets to intensify absorption. While you rest in warmth, experience a scalp massage. Emerge with skin that glows from within — softer, clearer, and deeply nourished.',
      price: 2799,
      duration: '90 mins',
      image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80',
      addOns: [{ name: 'Essential Oil Blend', price: 450 }, { name: 'Exfoliation Add-on', price: 350 }]
    }
  ];
}

module.exports = router;
