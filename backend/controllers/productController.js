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

// @dest Delete product
// @route DELETE /api/products/:id
// @accsess Private/admin
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.remove();
		res.json({ message: 'Product removed' });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// @dest Create product
// @route POST /api/products/
// @accsess Private/admin
const createProduct = asyncHandler(async (req, res) => {
	const product = await Product({
		name: 'Sample name',
		price: 0,
		user: req.user._id,
		image: '/images/sample.jpg',
		brand: 'sample',
		category: 'sample',
		countInStock: 0,
		numReviews: 0,
		description: 'sample',
	});

	const createdProduct = await product.save();

	res.status(201).json(createdProduct);
});

// @dest Update product
// @route PUT /api/products/:id
// @accsess Private/admin
const updateProduct = asyncHandler(async (req, res) => {
	const {
		name,
		price,
		description,
		image,
		brand,
		category,
		countInStock,
	} = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;

		const updatedProduct = await product.save();
		res.status(201).json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

export {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
};
