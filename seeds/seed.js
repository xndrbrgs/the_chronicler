const sequelize = require('../config/connection');
const {User, Book, UserBook} = require('../models');

// Bring in data
const userData = require('./userData.json');
const bookData = require('./bookData.json');

// Bulk create values in table
const seedDatabase = async () => {
  await sequelize.sync({force: true});

  //   seed user and books from json
  const users = await User.bulkCreate(userData);
  const books = await Book.bulkCreate(bookData);

  //   create random associations for user-books
  for (let i = 0; i < 10; i++) {
    // Get a random ids
    const {id: randomUserId} = users[Math.floor(Math.random() * users.length)];
    const {id: randomBookId} = books[Math.floor(Math.random() * books.length)];

    await UserBook.create({
      user_id: randomUserId,
      book_id: randomBookId,
    }).catch((err) => {
      console.log(err);
    });
  }

  process.exit(0);
};

seedDatabase();
