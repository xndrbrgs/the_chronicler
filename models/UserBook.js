const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class UserBook extends Model {}

UserBook.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
        unique: false,
      },
    },
    book_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'books',
        key: 'id',
        unique: false,
      },
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'user-book',
  }
);

module.exports = UserBook;
