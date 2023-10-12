import { DataTypes } from 'sequelize';
import db from '../db/connection';

export const Product = db.define(
	'Product', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nombre: {
			type: DataTypes.STRING
		},

		tipo: {
			type: DataTypes.STRING
		},

		precio: {
			type: DataTypes.DOUBLE
		}
	}, 
	{ 
		timestamps: false,
		tableName: 'productos'
	}
);
