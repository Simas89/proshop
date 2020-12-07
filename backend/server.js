import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import productRoutes from './routes/productRoutes';

dotenv.config();
connectDB();

const app = express();

app.get('/', (req, res) => {
	res.send('api is running');
});
app.use('/api/products', productRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(5000, console.log(`Server running on port: ${PORT}`.cyan));
