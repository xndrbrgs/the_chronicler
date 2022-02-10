const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {}

Book.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
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
		goodreads_rating: {
			type: DataTypes.INTEGER,
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'user',
				key: 'id',
			},
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'book',
	}
);
