const router = require('express').Router();
const userRoutes = require('./userRoutes');
const collectionRoutes = require('./collectionRoutes');

router.use('/user', userRoutes);
router.use('/collection', collectionRoutes);

module.exports = router;
