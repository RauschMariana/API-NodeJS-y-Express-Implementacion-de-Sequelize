import { DataTypes } from 'sequelize';
import { db } from '../db/connection';

export const User = db.define( 
	'User', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nombre: {
			type: DataTypes.STRING 
		},
		edad: {
			type: DataTypes.NUMBER 
		},
		email: {
			type: DataTypes.STRING 
		},
		telefono: {
			type: DataTypes.STRING 
		},
	}, 
	{
		timestamps:false,
		tableName: 'usuarios'
	}
);