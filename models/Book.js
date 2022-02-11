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
			type: DataTypes.TEXT,
		},
		genre: {
			type: DataTypes.TEXT,
		},
		rating: {
			type: DataTypes.DECIMAL(10, 2),
		},
		rating_count: {
			type: DataTypes.INTEGER,
		},
		review_count: {
			type: DataTypes.INTEGER,
		},
		image_url: {
			type: DataTypes.STRING,
		},
		goodreads_url: {
			type: DataTypes.STRING,
		},
		pages: {
			type: DataTypes.INTEGER,
		},
		recommended: {
			type: DataTypes.TEXT,
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
