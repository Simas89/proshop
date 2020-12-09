import asyncHandler from 'express-async-handler';
import Product from '../models/productModel';

// @Fetch all products
// @route GET /api/products
// @accsess Public
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

// @Fetch single product
// @route GET /api/products/:id
// @accsess Public
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

export { getProducts, getProductById };
