const sequelize = require('../config/connection');
const {User, Book, UserBook} = require('../models');

// Bring in data
const userData = require('./userData.json');
const bookData = require('./bookData.json');
// const userBookData = require('./userBookData.json');

// Bulk create values in table
const seedDatabase = async () => {
  await sequelize.sync({force: true});

  // seeded users
  //   const users = await User.bulkCreate(userData, {
  //     individualHooks: true,
  //     returning: true,
  //   });

  //   const books = await Book.bulkCreate(bookData, {
  //     individualHooks: true,
  //     returning: true,
  //   });

  const users = await User.bulkCreate(userData);

  const books = await Book.bulkCreate(bookData);

  //   seeded user/book associations
  //   const userBooks = await UserBook.bulkCreate(userBookData, {
  //     individualHooks: true,
  //     returning: true,
  //   });

  for (let i = 0; i < 10; i++) {
    // Get a random users id
    const {id: randomUserId} = users[Math.floor(Math.random() * users.length)];

    // Get a random books id
    const {id: randomBookId} = books[Math.floor(Math.random() * books.length)];

    // Create a new trip with random `trip_budget` and `traveller_amount` values, but with ids selected above
    await UserBook.create({
      user_id: randomUserId,
      book_id: randomBookId,
    }).catch((err) => {
      // If there's an error, such as the same random pairing of `traveller.id` and `location.id` occurring and we get a constraint error, don't quit the Node process
      console.log(err);
    });
  }

  process.exit(0);
};

seedDatabase();
