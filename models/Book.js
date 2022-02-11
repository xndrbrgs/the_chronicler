const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {}

Book.init(
	{
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
		},
		author: {
			type: DataTypes.STRING,
		},
		genre: {
			type: DataTypes.STRING,
		},
		image_url: {
			type: DataTypes.STRING,
		},
		pages: {
			type: DataTypes.INTEGER,
		},
	},
	{
		sequelize,
		timestamps: false,
		underscored: true,
		modelName: 'book',
	}
);

module.exports = Book;
