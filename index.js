import express from 'express';
import db from './db/connection.js';
import  User  from './models/user.js';
import Product from './models/product.js';


const app = express();
const expossedPort = 3456;

// 1- Endpoint para obtener el listado completo de usuarios
app.get('/usuarios/', async(req, res) => {
	try {
		const allUsers = await User.findAll();
		res.status(200).json(allUsers);
	} catch (error) {
		res.status(204).json({ message: 'error' });
	}
});
  
// 2- Endpoint que devuelva los datos de un
// usuario en particular consignado por su número de id.
app.get('/usuarios/:id', async(req, res) => {
	const userId = parseInt(req.params.id);
	const user = await User.findById(userId);
	if (!user) {
		return res.status(204).send('Usuario no encontrado');
	}
	res.send(user);
});
  
// 3- Endpoint que permita guardar un nuevo usuario.
app.post('/usuarios', (req, res) => {
	try {
		let bodyTemp = '';

		req.on('data', (chunk) => {
			bodyTemp += chunk.toString();
		});
    
		req.on('end', async () => {
			const data = JSON.parse(bodyTemp);
			req.body = data;
			const saveUser = new User(req.body);
			await saveUser.save();
		});
    
		res.status(201).json({'message': 'success'});

	} catch (error) {
		res.status(204).json({'message': 'error'});
	}
});
  
// 4- Endpoint que permita modificar algún atributo de un usuario
app.put('/usuarios/:id', async(req, res) => {
	const idActualice = parseInt(req.params.id);
	const userActualice = await User.findById(idActualice);
  
	if (!userActualice) {
		res.status(204).json({ message: 'Usuario no encontrado' });
	}
  
	let bodyTemp = '';
  
	req.on('data', (chunk) => {
		bodyTemp += chunk.toString();
	});
  
	req.on('end', () => {
		const data = JSON.parse(bodyTemp);
		req.body = data;
		if (data.nombre) {
			userActualice.nombre = data.nombre;
		}
  
		if (data.edad) {
			userActualice.edad = data.edad;
		}
  
		if (data.telefono) {
			userActualice.telefono = data.telefono;
		}
  
		res.status(200).send('Usuario actualizado');
	});
});
  
// 5- Endpoint que permita borrar un usuario de los datos
app.delete('/usuarios/:id', async(req, res) => {
	const userId = parseInt(req.params.id);
	try {
		const deleteUser = await User.findById(userId);
		if (!deleteUser) {
			return res.status(204).json({ message: 'Usuario no encontrado' });
		}
		await deleteUser.destroy();
		res.status(204).json({ message: 'Usuario borrado'});
	} catch (error) {
		res.status(204).json({ message: 'error' });
	}	
});
  
// 6- Endpoint que permita obtener el precio de un producto que se indica por id
app.get('/productos/:id/precio', async(req, res) => {
	const productId = parseInt(req.params.id);
	const product = await Product.findById(productId);
	if (!product) {
		return res.status(204).send('Producto no encontrado');
	}
	const price = product.precio;
	res.send(`El precio del producto es $${price}`);
});
  
// 7- Endpoint que permita obtener el nombre de un producto que se indica por id
app.get('/productos/:id/nombre', async(req, res) => {
	const productId = parseInt(req.params.id);
	const product = await Product.findById(productId);
	if (!product) {
		return res.status(204).send('Producto no encontrado');
	}
	res.send(`El nombre del producto con ID ${product.id} es ${product.nombre}`);
});
  
// 8- Endpoint que permita obtener el teléfono de un usuario que se indica por id
app.get('/usuarios/:id/telefono', async (req, res) => {
	const userId = parseInt(req.params.id);
	const user = await User.findById(userId);
	if (!user) {
		return res.status(204).send('Usuario no encontrado');
	}
	const telephone = user.telefono;
  
	res.send(`El teléfono del usuario es: ${telephone}`);
});
  
// 9- Endpoint que permita obtener el nombre de un usuario que se indica por id
app.get('/usuarios/:id/nombre', async(req, res) => {
	const userId = parseInt(req.params.id);
	const userName = await User.findById(userId);
	if (!userName) {
		return res.status(204).send('Usuario no encontrado');
	}
	res.send(userName.nombre);
});
  
// 10- Endpoint que permita obtener el total del stock actual de
// productos, la sumatoria de los precios individuales
app.get('/productos/:precio', async (req, res) => {
	const totalPrice = await Product.reduce((total, product) => total + product.precio, 0);
  
	res.json({ totalPrice });
});

app.use((req, res) => {
	res.status(404).send('<h1>404</h1>');
});
  
app.listen(expossedPort, () => {
	console.log('Servidor iniciado en el puerto http://localhost:' + expossedPort);
});

try {
	await db.authenticate();
	console.log('Connection has been established successfully.');
} catch (error) {
	console.error('Unable to connect to the database:', error);
}