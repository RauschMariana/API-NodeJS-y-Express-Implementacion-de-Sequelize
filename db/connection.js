import { Sequelize } from 'sequelize';


export const db = new Sequelize(
	'pyezuinz',
	'pyezuinz',
	'RdI49xvpZqrlmP8G2HWzctwMPIhdD9uh', // Password
	
	{
		host: 'silly.db.elephantsql.com',
		dialect: 'postgres',
		logging: true
	}
);