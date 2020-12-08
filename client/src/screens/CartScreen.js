import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import styled from 'styled-components';
import Message from 'components/Message';
import { Link } from 'react-router-dom';
import {
	Button,
	Grid,
	Typography,
	List,
	ListItem,
	Card,
	CardContent,
	CardActions,
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';

const CartScreenWrapper = styled.div`
	img {
		width: 100%;
	}
`;

const CartScreen = ({ match, location, history }) => {
	const productId = match.params.id;
	const qty = location.search ? Number(location.search.split('=')[1]) : 1;

	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	React.useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, productId, qty]);

	const removeFromCarthandler = (id) => {
		dispatch(removeFromCart(id));
	};

	const checkoutHandler = () => {
		history.push('/login?redirect=shipping');
	};

	return (
		<CartScreenWrapper>
			<Grid container>
				<Grid item md={8}>
					<Typography variant="h5">SHOPPING CART</Typography>
					{cartItems.length === 0 ? (
						<Message>
							Your cart is empty <Link to="/">Go Back</Link>
						</Message>
					) : (
						<List>
							{cartItems.map((el) => (
								<ListItem key={el.product}>
									<Grid container spacing={1}>
										<Grid item md={2}>
											<img src={el.image} alt={el.name}></img>
										</Grid>
										<Grid item md={3}>
											<Link to={`/product/${el.product}`}>
												{el.name}
											</Link>
										</Grid>
										<Grid item md={2}>
											<Typography>£{el.price}</Typography>
										</Grid>
										<Grid item md={2}>
											<FormControl
												// variant="outlined"
												style={{
													width: '70px',
													minWidth: '80px',
													padding: 0,
												}}
											>
												<Select
													labelId="demo-simple-select-outlined-label"
													id="demo-simple-select-outlined"
													value={el.qty}
													onChange={(e) =>
														dispatch(
															addToCart(
																el.product,
																Number(e.target.value)
															)
														)
													}
												>
													{[...Array(el.countInStock).keys()].map(
														(el) => (
															<MenuItem
																key={'key' + el + 1}
																value={el + 1}
															>
																{el + 1}
															</MenuItem>
														)
													)}
												</Select>
											</FormControl>
										</Grid>
										<Grid item md={2}>
											<Button
												onClick={() =>
													removeFromCarthandler(el.product)
												}
												fullWidth
												// variant="contained"
												color="primary"
												// disabled={product.countInStock === 0}
											>
												<DeleteIcon />
											</Button>
										</Grid>
									</Grid>
								</ListItem>
							))}
						</List>
					)}
				</Grid>
				<Grid item md={4}>
					<Card>
						<CardContent>
							<List>
								<ListItem>
									<Typography variant="h6">
										SUBTOTAL (
										{cartItems.reduce(
											(acc, item) => acc + item.qty,
											0
										)}
										) ITEMS
									</Typography>
								</ListItem>
								<ListItem>
									<Typography variant="h6">
										{' '}
										$
										{cartItems
											.reduce(
												(acc, item) => acc + item.qty * item.price,
												0
											)
											.toFixed(2)}
									</Typography>
								</ListItem>
								<ListItem>
									<Button
										onClick={checkoutHandler}
										fullWidth
										variant="contained"
										color="primary"
										disabled={cartItems.length === 0}
									>
										Procced To Checkout
									</Button>
								</ListItem>
							</List>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</CartScreenWrapper>
	);
};

export default CartScreen;
