import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';
import uploadRoutes from './routes/uploadRoutes';

dotenv.config();
connectDB();

const app = express();

/// ---

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(morgan('dev'));

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));

	app.get('*', (req, res) =>
		res.sendFile(
			path.resolve(__dirname, '../', 'client', 'build', 'index.html')
		)
	);
}

app.use(notFound);
app.use(errorHandler);

/// ---

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port: ${PORT}`.cyan));
