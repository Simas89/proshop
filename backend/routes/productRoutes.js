import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel';

const router = express.Router();

// @Fetch all products
// @route GET /api/products
// @accsess Public
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const products = await Product.find({});
		// console.log(products);
		// res.status(401);
		// throw new Error('Failed!!!');
		res.json(products);
	})
);

// @Fetch single product
// @route GET /api/products/:id
// @accsess Public
router.get(
	'/:id',
	asyncHandler(async (req, res) => {
		const product = await Product.findById(req.params.id);
		console.log(product);

		if (product) {
			res.json(product);
		} else {
			res.status(404);
			throw new Error('Product not found');
		}
	})
);

export default router;
