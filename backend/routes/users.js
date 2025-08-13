const router = require('express').Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Search users by username
router.get('/search', auth, async (req, res) => {
  try {
    const searchQuery = req.query.username || '';
    const users = await User.find({
      username: { $regex: searchQuery, $options: 'i' },
      _id: { $ne: req.user.userId } // Exclude current user
    }).select('username fullName');

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error searching users' });
  }
});

module.exports = router;
