const router = require('express').Router();
const { Collection, Book, User } = require('../../models');
const withAuth = require('../../utils/auth');

// * /api/book

// Get all saved books
router.get('/', async (req, res) => {
	try {
		const bookData = await Book.findAll();

		const books = bookData.map((book) => book.get({ plain: true }));

		res.status(200).json(books);
	} catch (err) {
		res.status(500).json(err);
	}
});

// TODO: Get book by id
router.get('/:id', async (req, res) => {
	try {
		const bookData = await Book.getById({
			where: {
				id: req.params.id,
			},
		});

		if (!bookData) {
			res.status(404).json({ message: 'No book found with this id!' });
			return;
		}

		res.status(200).json(bookData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Add book to collection
router.post('/', withAuth, async (req, res) => {
	try {
		const newBook = await Book.create({
			...req.body,
			user_id: req.session.user_id,
		});

		res.status(200).json(newBook);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Update book in collection
router.put('/:id', withAuth, async (req, res) => {
	try {
		let updatedBook = await Book.update(req.body, {
			where: {
				id: req.params.id,
			},
		});

		if (!updatedBook) {
			res.status(404).json({
				message: 'Sorry! No book found with that ID',
			});
			return;
		}

		res.status(200).json(updatedBook);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Remove book from collection by id
router.delete('/:id', withAuth, async (req, res) => {
	try {
		const bookData = await Book.destroy({
			where: {
				id: req.params.id,
				user_id: req.session.user_id,
			},
		});

		if (!bookData) {
			res.status(404).json({ message: 'No book found with this id!' });
			return;
		}

		res.status(200).json(bookData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
