import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Button,
	Typography,
	Grid,
	List,
	ListItem,
	Divider,
	Box,
	Card,
	CardContent,
} from '@material-ui/core';
import FormContainer from 'components/FormContainer';
import CheckoutSteps from 'components/CheckoutSteps';
import Message from 'components/Message';
import StyledLink from 'components/StyledLink';

import { createOrder } from '../actions/orderActions';
import { CART_RESET } from 'constants/cartConstants';

const addDecimals = (num) => {
	return (Math.round(num * 100) / 100).toFixed(2);
};

const PlaceOrderScreen = ({ history }) => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);

	cart.itemsPrice = addDecimals(
		cart.cartItems
			.reduce((acc, item) => acc + item.price * item.qty, 0)
			.toFixed(2)
	);
	cart.shippingPrice = Number(cart.itemsPrice > 100 ? 0 : 10);
	cart.taxPrice = addDecimals(Number((0.2 * cart.itemsPrice).toFixed(2)));
	cart.totalPrice =
		Number(cart.taxPrice) +
		Number(cart.itemsPrice) +
		Number(cart.shippingPrice);

	const orderCreate = useSelector((state) => state.orderCreate);

	const { order, success, error } = orderCreate;

	React.useEffect(() => {
		if (success) {
			history.push(`/order/${order._id}`);
		}
		//eslint-disable-next-line
	}, [history, success]);

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			})
		);
		dispatch({ type: CART_RESET });
	};
	return (
		<>
			<FormContainer>
				<CheckoutSteps activeStep={3} />
			</FormContainer>

			<Grid container spacing={2}>
				<Grid item md={8}>
					<List>
						<ListItem>
							<div>
								<Typography variant="h6">SHIPPING</Typography>

								<Typography variant="body2">
									<strong>Address: </strong>
									{cart.shippingAddress.address},{' '}
									{cart.shippingAddress.city},{' '}
									{cart.shippingAddress.postalCode},{' '}
									{cart.shippingAddress.country}
								</Typography>
							</div>
						</ListItem>
						<Divider />
						<ListItem>
							<div>
								<Typography variant="h6">PAYMENT METHOD</Typography>

								<Typography variant="body2">
									<strong>Method: </strong>
									{cart.paymentMethod &&
										cart.paymentMethod.paymentMethod}
								</Typography>
							</div>
						</ListItem>
						<Divider />

						<ListItem>
							<div>
								<Typography variant="h6">ORDER ITEMS</Typography>
								{cart.cartItems.length === 0 ? (
									<Message>Yor cart is empty</Message>
								) : (
									<List>
										{cart.cartItems.map((item, index) => {
											const totalPrice = item.price * item.qty;
											return (
												<div key={index}>
													<ListItem
														key={index}
														style={{ padding: 0 }}
													>
														<Grid container spacing={1}>
															<Grid item xs={3} md={3}>
																<div
																	style={{
																		maxHeight: '150px',
																		overflow: 'hidden',
																		display: 'flex',
																		justifyContent: 'center',
																		alignItems: 'center',
																	}}
																>
																	<img
																		style={{
																			maxWidth: '100%',
																		}}
																		src={item.image}
																		alt={item.name}
																	></img>
																</div>
															</Grid>
															<Grid item xs={5} md={5}>
																<StyledLink
																	to={`/product/${item.product}`}
																>
																	{item.name}
																</StyledLink>
															</Grid>
															<Grid item xs={4} md={4}>
																{item.qty} x {item.price} = £
																{totalPrice.toFixed(2)}
															</Grid>
														</Grid>
													</ListItem>
													<Divider />
												</div>
											);
										})}
									</List>
								)}
							</div>
						</ListItem>
					</List>
				</Grid>
				<Grid item xs={12} md={4}>
					<Card>
						<CardContent>
							<List>
								<ListItem>
									<Typography variant="h6">ORDER SUMMARY</Typography>
								</ListItem>
								<ListItem>
									<Grid container>
										<Grid item xs={6}>
											Items
										</Grid>
										<Grid item xs={6}>
											£{cart.itemsPrice}
										</Grid>
									</Grid>
								</ListItem>
								<ListItem>
									<Grid container>
										<Grid item xs={6}>
											Shipping
										</Grid>
										<Grid item xs={6}>
											£{cart.shippingPrice}
										</Grid>
									</Grid>
								</ListItem>
								<ListItem>
									<Grid container>
										<Grid item xs={6}>
											Tax
										</Grid>
										<Grid item xs={6}>
											£{cart.taxPrice}
										</Grid>
									</Grid>
								</ListItem>
								<ListItem>
									<Grid container>
										<Grid item xs={6}>
											Total
										</Grid>
										<Grid item xs={6}>
											£{cart.totalPrice.toFixed(2)}
										</Grid>
									</Grid>
								</ListItem>
								<ListItem>
									{error && <Message variant="error">{error}</Message>}
								</ListItem>
								<ListItem>
									<Button
										fullWidth
										variant="contained"
										color="secondary"
										disabled={cart.cartItems.length === 0}
										onClick={placeOrderHandler}
									>
										Place Order
									</Button>
								</ListItem>
							</List>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</>
	);
};

export default PlaceOrderScreen;
