const router = require('express').Router();
const { supabaseAdmin } = require('../supabase');

// POST /api/v1/inquiries — 문의 접수
router.post('/', async (req, res) => {
  const { name, email, category, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const { data, error } = await supabaseAdmin.from('inquiries').insert({
    name, email, category: category || 'general', subject: subject || '', message
  }).select().single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({ inquiry: { id: data.id }, message: 'Inquiry submitted successfully' });
});

module.exports = router;
