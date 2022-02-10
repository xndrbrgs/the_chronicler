const User = require('./User');
const Book = require('./Book');

// TODO: look through activities to allow books to belong to many users
User.hasMany(Book, {});

Book.belongsTo(User, {});

module.exports = { User, Book };
