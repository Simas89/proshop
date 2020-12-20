import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import styled from 'styled-components';
import Message from 'components/Message';
import {
	Button,
	Grid,
	Typography,
	List,
	ListItem,
	Card,
	CardContent,
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CloseIcon from '@material-ui/icons/Close';
import StyledLink from 'components/StyledLink';

import Meta from 'components/Meta';

const CartScreenWrapper = styled.div`
	img {
		max-width: 100%;
		max-height: 100%;
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
			<Meta title={'DemoShop | Cart'} />{' '}
			<Grid container spacing={2}>
				<Grid item md={8}>
					<Typography variant="h5">SHOPPING CART</Typography>
					{cartItems.length === 0 ? (
						<Message>Your cart is empty</Message>
					) : (
						<List>
							{cartItems.map((el) => (
								<ListItem key={el.product} style={{ padding: 0 }}>
									<Grid container spacing={1}>
										<Grid item xs={3}>
											<img src={el.image} alt={el.name}></img>
										</Grid>
										<Grid item xs={3}>
											<StyledLink to={`/product/${el.product}`}>
												{el.name}
											</StyledLink>
										</Grid>
										<Grid item xs={2}>
											<Typography variant="body2">
												£{el.price}
											</Typography>
										</Grid>
										<Grid item xs={1}>
											<FormControl
												// variant="outlined"
												style={{
													// width: '70px',
													// minWidth: '80px',
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
										<Grid item md={1}>
											<Button
												onClick={() =>
													removeFromCarthandler(el.product)
												}
												// fullWidth
												style={{ backgroundColor: 'transparent' }}
												disableRipple
												color="secondary"
											>
												<CloseIcon />
											</Button>
										</Grid>
									</Grid>
								</ListItem>
							))}
						</List>
					)}
				</Grid>
				<Grid item xs={12} md={4}>
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
										color="secondary"
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
