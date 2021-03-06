import React from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import {
	ORDER_PAY_RESET,
	ORDER_DELIVER_RESET,
} from '../constants/orderConstants';
import {
	Typography,
	Grid,
	List,
	ListItem,
	Divider,
	Card,
	CardContent,
	Link,
	Button,
} from '@material-ui/core';
import Loader from 'components/Loader';
import StyledLink from 'components/StyledLink';
import Meta from 'components/Meta';

import {
	getOrderDetails,
	payOrder,
	deliverOrder,
} from '../actions/orderActions';
import Message from 'components/Message';

const OrderScreen = ({ match, history }) => {
	const [sdkReady, setSdkReady] = React.useState(false);
	const dispatch = useDispatch();
	const orderId = match.params.id;

	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;

	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, success: successPay } = orderPay;

	const orderDeliver = useSelector((state) => state.orderDeliver);
	const { success: successDeliver } = orderDeliver;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	if (!loading) {
		//   Calculate prices
		const addDecimals = (num) => {
			return (Math.round(num * 100) / 100).toFixed(2);
		};

		order.itemsPrice = addDecimals(
			order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
		);
	}

	React.useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		}

		const addPayPalScript = async () => {
			const { data: clientId } = await axios.get('/api/config/paypal');
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
			script.async = true;
			script.onload = () => {
				setSdkReady(true);
			};
			document.body.appendChild(script);
		};

		if (!order || successPay || successDeliver || order._id !== orderId) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch({ type: ORDER_DELIVER_RESET });
			dispatch(getOrderDetails(orderId));
		} else if (!order.isPaid) {
			if (!window.paypal) {
				addPayPalScript();
			} else {
				setSdkReady(true);
			}
		}
	}, [
		dispatch,
		orderId,
		successPay,
		order,
		userInfo,
		history,
		successDeliver,
	]);

	const successPaymentHandler = (paymentResult) => {
		dispatch(payOrder(orderId, paymentResult));
	};

	const deliverHandler = () => {
		dispatch(deliverOrder(order));
	};

	return (
		<>
			<Meta title={'DemoShop | Order'} />
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="error">{error}</Message>
			) : (
				<>
					<Typography variant="h5">ORDER {order._id}</Typography>
					<Grid container spacing={2}>
						<Grid item md={8}>
							<List>
								<ListItem>
									<div style={{ width: '100%' }}>
										<Typography variant="h6">SHIPPING</Typography>
										<Typography variant="body2">
											<strong>Name: </strong> {order.user.name}
										</Typography>
										<Typography variant="body2">
											<strong>Email: </strong>
											<Link href={`mailto:${order.user.email}`}>
												{order.user.email}
											</Link>
										</Typography>
										<Typography variant="body2">
											<strong>Address: </strong>
											{order.shippingAddress.address},{' '}
											{order.shippingAddress.city},{' '}
											{order.shippingAddress.postalCode},{' '}
											{order.shippingAddress.country}
										</Typography>
										{order.isDelivered ? (
											<Message variant="success">
												Delivered on {order.deliveredAt}
											</Message>
										) : (
											<Message variant="warning">
												Not Delivered
											</Message>
										)}
									</div>
								</ListItem>
								<Divider />
								<ListItem>
									<div style={{ width: '100%' }}>
										<Typography variant="h6">
											PAYMENT METHOD
										</Typography>

										<Typography variant="body2">
											<strong>Method: </strong>
											{order.paymentMethod && order.paymentMethod}
										</Typography>
										{order.isPaid ? (
											<Message variant="success">
												Paid on {order.paidAt}
											</Message>
										) : (
											<Message variant="warning">Not Paid</Message>
										)}
									</div>
								</ListItem>
								<Divider />

								<ListItem>
									<div>
										<Typography variant="h6">ORDER ITEMS</Typography>
										{order.orderItems.length === 0 ? (
											<Message>Order is empty</Message>
										) : (
											<List>
												{order.orderItems.map((item, index) => {
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
																				justifyContent:
																					'center',
																				alignItems:
																					'center',
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
																		{item.qty} x {item.price}{' '}
																		= £{totalPrice.toFixed(2)}
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
											<Typography variant="h6">
												ORDER SUMMARY
											</Typography>
										</ListItem>
										<ListItem>
											<Grid container>
												<Grid item xs={6}>
													Items:
												</Grid>
												<Grid item xs={6}>
													£{order.itemsPrice}
												</Grid>
											</Grid>
										</ListItem>
										<ListItem>
											<Grid container>
												<Grid item xs={6}>
													Shipping:
												</Grid>
												<Grid item xs={6}>
													£{order.shippingPrice}
												</Grid>
											</Grid>
										</ListItem>
										<ListItem>
											<Grid container>
												<Grid item xs={6}>
													Tax:
												</Grid>
												<Grid item xs={6}>
													£{order.taxPrice}
												</Grid>
											</Grid>
										</ListItem>
										<ListItem>
											<Grid container>
												<Grid item xs={6}>
													Total:
												</Grid>
												<Grid item xs={6}>
													£{order.totalPrice.toFixed(2)}
												</Grid>
											</Grid>
										</ListItem>
										{!order.isPaid && (
											<div>
												{loadingPay && <Loader />}
												{!sdkReady ? (
													<Loader />
												) : (
													<PayPalButton
														style={{ width: '100%' }}
														amount={order.totalPrice.toFixed(2)}
														onSuccess={successPaymentHandler}
													/>
												)}
											</div>
										)}
										{userInfo &&
											userInfo.isAdmin &&
											order.isPaid &&
											!order.isDelivered && (
												<ListItem>
													<Button
														variant="outlined"
														onClick={deliverHandler}
													>
														Mark as delivered
													</Button>
												</ListItem>
											)}
									</List>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</>
			)}
		</>
	);
};

export default OrderScreen;
