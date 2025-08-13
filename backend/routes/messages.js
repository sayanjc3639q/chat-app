const router = require('express').Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');

// Get chat history between two users
router.get('/:userId', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.userId, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user.userId }
      ]
    })
    .sort({ timestamp: 1 })
    .populate('sender', 'username fullName')
    .populate('receiver', 'username fullName');

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching messages' });
  }
});

module.exports = router;
