const router = require('express').Router();
// TODO: add models
const withAuth = require('../utils/auth');

// render home page
router.get('/', async (req, res) => {});

// render book by id
router.get('/book/:id', async (req, res) => {});

// render user by id
router.get('/user/:id', async (req, res) => {});

// render login page
router.get('/login', async (req, res) => {});

// render signup page
router.get('/signup', async (req, res) => {});

// render dashboard page
router.get('/dashboard', async (req, res) => {});
