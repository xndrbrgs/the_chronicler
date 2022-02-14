const router = require('express').Router();
const {Book, User} = require('../models');
const withAuth = require('../utils/auth');
const {randomNumber} = require('../utils/helpers');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', async (req, res) => {
  res.render('landingpage', {layout: 'landing.handlebars'});
});

// render login page
router.get('/login', async (req, res) => {
  // redirect to home if user is logged in
  if (req.session.logged_in) {
    res.redirect('/home');
    return;
  }
  res.render('login', {layout: 'signin.handlebars'});
});

// render signup page
router.get('/signup', async (req, res) => {
  res.render('signup', {layout: 'signin.handlebars'});
});

// render home page
router.get('/home', async (req, res) => {
  try {
    // USER INFO
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {exclude: ['password']},
    });
    const user = userData.get({plain: true});

    // TOP CAROUSEL
    // get number of books in database
    const bookNum = await Book.findAndCountAll();
    const randomBooks = [];

    for (let i = 0; i < 6; i++) {
      // get book of random ids based on db length
      const bookData = await Book.findByPk(randomNumber(bookNum.count));

      // if book doesn't have image_url, try again
      if (bookData.dataValues.image_url === null) i--;
      randomBooks.push(bookData.dataValues);
    }

    // RECOMMENDED
    const recommendedIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const recommendedBooks = [];

    recommendedIds.forEach(async (id) => {
      const bookData = await Book.findByPk(id);
      recommendedBooks.push(bookData.dataValues);
    });

    res.render('homepage', {
      user,
      randomBooks,
      recommendedBooks,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render search results
router.get('/search/:term', async (req, res) => {
  try {
    // USER INFO
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {exclude: ['password']},
    });
    const user = userData.get({plain: true});

    const bookData = await Book.findAll({
      where: {
        [Op.or]: [
          {title: {[Op.like]: `%${req.params.term}%`}},
          {author: {[Op.like]: `%${req.params.term}%`}},
          {genre: {[Op.like]: `%${req.params.term}%`}},
        ],
      },
    });

    const searchedTerm = req.params.term;

    const books = bookData.map((book) => book.get({plain: true}));

    // res.status(200).json(bookData);

    res.render('search', {
      user,
      searchedTerm,
      books,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// TODO: Use this to fill in dynamic links for chosen book
// render book by id
router.get('/book/:id', async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {
      include: [{model: Book}],
    });

    const book = bookData.get({plain: true});

    // res.render('book', {
    //   ...book,
    //   logged_in: req.session.logged_in,
    // });

    // render chosen book page
    res.render('chosenbook', {
      layout: 'chosen.handlebars',
      ...book,
      Book,
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
    // USER INFO
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {exclude: ['password']},
    });
    const user = userData.get({plain: true});

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
