const User = require('./User');
const Book = require('./Book');

// TODO: look through activities to allow books to belong to many users
User.hasMany(Book, {
	foreignKey: 'user_id',
});

Book.belongsTo(User, {
	foreignKey: 'user_id',
});

module.exports = { User, Book };
