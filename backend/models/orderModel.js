import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			reqired: true,
			ref: 'User',
		},
		orderItems: [
			{
				name: { type: String, requred: true },
				qty: { type: Number, requred: true },
				image: { type: String, requred: true },
				price: { type: Number, requred: true },
				product: {
					type: mongoose.Schema.Types.ObjectId,
					requred: true,
					ref: 'Product',
				},
			},
		],
		shippingAddress: {
			address: { type: String, required: true },
			city: { type: String, required: true },
			postalCode: { type: String, required: true },
			country: { type: String, required: true },
		},
		paymentMethod: { type: String, reqired: true },
		paymentResult: {
			id: { type: String },
			status: { type: String },
			update_time: { type: String },
			email_address: { type: String },
		},
		taxPrice: { type: Number, reqired: true, default: 0.0 },
		shippingPrice: { type: Number, reqired: true, default: 0.0 },
		totalPrice: { type: Number, reqired: true, default: 0.0 },
		isPaid: { type: Boolean, reqired: true, default: false },
		paidAt: { type: Date },
		isDelivered: { type: Boolean, required: true, default: false },
		deliveredAt: { type: Date },
	},
	{ timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
