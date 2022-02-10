const router = require('express').Router();
const { Collection } = require('../../models');
const withAuth = require('../../utils/auth');

// * /api/collection

// Add book to collection
router.post('/', withAuth, async (req, res) => {});

// Update book in collection
router.put('/:id', withAuth, async (req, res) => {});

// Remove book from collection by id
router.delete('/:id', withAuth, async (req, res) => {});

module.exports = router;
