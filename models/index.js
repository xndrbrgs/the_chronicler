const User = require('./User');
const Book = require('./Book');
const UserBook = require('./UserBook');

User.belongsToMany(Book, {
  through: {
    model: UserBook,
    unique: false,
  },
});

Book.belongsToMany(User, {
  through: {
    model: UserBook,
    unique: false,
  },
});

module.exports = {User, Book, UserBook};
