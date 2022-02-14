const router = require('express').Router();
const {User, Book, UserBook} = require('../../models');

// * /api/user

// Get all users
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const userData = await User.findAll();

    // Serialize data so the template can read it
    const users = userData.map((user) => user.get({plain: true}));

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {email: req.body.email},
    });

    if (!userData) {
      res.status(400).json({
        message: 'Incorrect email or password, please try again',
      });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({
        message: 'Incorrect email or password, please try again',
      });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({user: userData, message: 'You are now logged in!'});
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Add book to user
router.post('/add', async (req, res) => {
  try {
    const userData = await UserBook.create({
      user_id: req.session.user_id,
      book_id: req.body.book_id,
    });

    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get user by id
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: {
        model: Book,
        through: UserBook,
      },
      attributes: {
        exclude: ['password'],
      },
    });

    if (!userData) {
      res.status(404).json({message: 'No user found with this id'});
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
