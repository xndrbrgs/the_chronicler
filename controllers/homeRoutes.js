const router = require('express').Router();
const { Book, User } = require('../models');
// TODO: add models
// const withAuth = require("../utils/auth");

router.get('/', async (req, res) => {
	res.render('landingpage', { layout: 'landing.handlebars' });
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
		// Get all books and JOIN with user data
		const booktData = await Book.findAll({
			include: [
				{
					model: User,
					attributes: ['name'],
				},
			],
		});

		// Serialize data so the template can read it
		const books = bookData.map((project) => book.get({ plain: true }));

		// Pass serialized data and session flag into template
		res.render('homepage', {
			layout: 'home.handlebars',
			books,
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
						'title',
						'id',
						'author',
						'description',
						'image_url',
						'pages',
						'genre',
						'goodreads_rating',
					],
				},
			],
		});

		const book = bookData.get({ plain: true });

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

		const user = userData.get({ plain: true });

		res.render('user', {
			...user,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// render dashboard page
router.get('/dashboard', async (req, res) => {
	try {
		// Find the logged in user based on the session ID
		const userData = await User.findByPk(req.session.user_id, {
			attributes: { exclude: ['password'] },
			include: [{ model: Project }],
		});

		const user = userData.get({ plain: true });

		res.render('dashboard', {
			...user,
			logged_in: true,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
