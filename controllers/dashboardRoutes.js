const router = require('express').Router();
const {Book, User} = require('../models');
const withAuth = require('../utils/auth');

// render dashboard page
router.get('/', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID + include their associated books
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {exclude: ['password']},
      include: [{model: Book}],
    });

    const user = userData.get({plain: true});
    console.log(user);

    res.render('dashboard', {
      user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
