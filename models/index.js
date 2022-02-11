const User = require('./User');
const Book = require('./Book');
const UserBook = require('./UserBook');

User.belongsToMany(Book, {through: 'User-Books'});
Book.belongsToMany(User, {through: 'User-Books'});

module.exports = {User, Book, UserBook};
