const router = require('express').Router();
const {Book, User} = require('../models');
const withAuth = require('../utils/auth');
const {randomNumber} = require('../utils/helpers');

router.get('/', async (req, res) => {
  res.render('landingpage', {layout: 'landing.handlebars'});
});

// render login page
router.get('/login', async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/home');
    return;
  }

  res.render('login');
});

// render signup page
router.get('/signup', async (req, res) => {
  res.render('signup');
});

// render home page
router.get('/home', async (req, res) => {
  try {
    // user info
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {exclude: ['password']},
    });

    const user = userData.get({plain: true});

    // top carousel
    let randomBooks = [];

    for (let i = 0; i < 6; i++) {
      let randomId = randomNumber(10000);
      const bookData = await Book.findByPk(randomId);

      if (bookData.dataValues.image_url === null) i--;

      randomBooks.push(bookData.dataValues);
    }

    // recommended books
    let recommendedIds = [1168, 5944, 161, 47, 4011, 419, 1, 14, 22, 25];
    let recommendedBooks = [];

    for (let i = 0; i < recommendedIds.length; i++) {
      const bookData = await Book.findByPk(recommendedIds[i]);

      recommendedBooks.push(bookData.dataValues);
    }

    res.render('homepage', {
      layout: 'home.handlebars',
      user,
      randomBooks,
      recommendedBooks,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// render book by id
router.get('/book/:id', async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {
      include: [
        {
          model: Book,
          attributes: [
            'id',
            'title',
            'description',
            'author',
            'genre',
            'raiting',
            'raiting_count',
            'image_url',
            'goodreads_url',
            'pages',
            'recommended',
          ],
        },
      ],
    });

    const book = bookData.get({plain: true});

    res.render('book', {
      ...book,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// render user by id
router.get('/user/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const user = userData.get({plain: true});

    res.render('user', {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// render dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID + include their associated books
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {exclude: ['password']},
      include: [{model: Book}],
    });

    const user = userData.get({plain: true});

    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
