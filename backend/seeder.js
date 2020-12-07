import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users';
import products from './data/products';
import colors from 'colors';

import User from './models/userModel';
import Product from './models/productModel';
import Order from './models/orderModel';

dotenv.config();
import connectDB from './config/db';

connectDB();

const importData = async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		const createdUsers = await User.insertMany(users);
		const adminUser = createdUsers[0]._id;

		const sampleProducts = products.map((el) => {
			return { ...el, user: adminUser };
		});

		await Product.insertMany(sampleProducts);

		console.log('Data imported'.green);
		process.exit();
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		console.log('Data destroyed!'.red);
		process.exit();
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};
console.log(process.argv);

if (process.argv[2] === '-X') {
	destroyData();
} else {
	importData();
}
