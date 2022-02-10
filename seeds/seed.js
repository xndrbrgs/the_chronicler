const sequelize = require('../config/connection');
const { User, Book } = require('../models');

// Bring in data
const userData = require('./userData.json');
const bookData = require('./bookData.json');

// Bulk create values in table
const seedDatabase = async () => {
	await sequelize.sync({ force: true });

	const users = await User.bulkCreate(userData, {
		individualHooks: true,
		returning: true,
	});

	const books = await Book.bulkCreate(bookData, {
		individualHooks: true,
		returning: true,
	});

	process.exit(0);
};

seedDatabase();
