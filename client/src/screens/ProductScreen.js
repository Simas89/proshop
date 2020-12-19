import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
	Button,
	Typography,
	Grid,
	List,
	ListItem,
	Paper,
	TextareaAutosize,
	Box,
	Divider,
	// useTheme,
} from '@material-ui/core';
import Ratingas from 'components/Ratingas';
import Loader from 'components/Loader';
import Message from 'components/Message';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Meta from 'components/Meta';

import {
	listProductDetails,
	createProductReview,
} from '../actions/productActions';

import { addToCart } from '../actions/cartActions';

import {
	PRODUCT_CREATE_REVIEW_RESET,
	PRODUCT_DETAILS_RESET,
} from 'constants/productConstants';
import StyledLink from 'components/StyledLink';

import { arrHasKeyVal } from 'utils/utils';

const ProductScreenWrapper = styled.div`
	.link {
		text-decoration: none;
	}
	.img-div {
		img {
			/* display: none; */
			width: 100%;
		}
	}
	.text-area {
		background-color: none;
		resize: none;
		width: 100%;
		padding: 14px;
		font-family: Roboto;
		font-size: 1rem;
		border-radius: 5px;
		border: 1px solid rgb(180, 180, 180);
		background: none;
	}
`;

const ProductScreen = ({ history, match }) => {
	const [qty, setQty] = React.useState(1);
	const [rating, setRating] = React.useState(0);
	const [comment, setComment] = React.useState('');
	const [inCart, setInCart] = React.useState(false);
	const dispatch = useDispatch();

	const productReviewCreate = useSelector(
		(state) => state.productReviewCreate
	);
	const {
		error: errorProductReview,
		success: successProductReview,
	} = productReviewCreate;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	React.useLayoutEffect(() => {
		dispatch({ type: PRODUCT_DETAILS_RESET });
	}, []);

	React.useEffect(() => {
		if (successProductReview) {
			alert('Review Submited!');
			setComment('');
			setRating(0);
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}
		dispatch(listProductDetails(match.params.id));
	}, [dispatch, match.params.id, successProductReview]);

	React.useEffect(() => {
		if (arrHasKeyVal(cartItems, 'product', match.params.id)) {
			const index = cartItems
				.map((item) => item.product)
				.indexOf(match.params.id);

			setQty(cartItems[index].qty);
			setInCart(true);
		}
	}, [cartItems]);

	const addToCartHandler = () => {
		// history.push(`/cart/${match.params.id}?qty=${qty}`);
		dispatch(addToCart(match.params.id, qty));
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(createProductReview(match.params.id, { rating, comment }));
	};

	return (
		<ProductScreenWrapper>
			{/* <Link to="/" className="link">
				<Button variant="text">Go Back</Button>
			</Link> */}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="error">{error}</Message>
			) : (
				<>
					<Meta title={product.name} />
					<Grid container>
						<Grid item md={6}>
							<div className="img-div">
								<img src={product.image} alt={product.name} />
							</div>
						</Grid>
						<Grid item md={3}>
							<List>
								<ListItem>
									<Typography variant="h5">{product.name}</Typography>
								</ListItem>

								<ListItem>
									<Ratingas
										value={product.rating}
										num={product.numReviews}
									/>
								</ListItem>

								<ListItem>
									<Typography variant="h5">
										Price: £{product.price}
									</Typography>
								</ListItem>

								<ListItem>
									<Typography variant="body1">
										{product.description}
									</Typography>
								</ListItem>
							</List>
						</Grid>
						<Grid item md={3}>
							<Paper>
								<List>
									<ListItem>
										<Grid container>
											<Grid item xs={6}>
												<Typography variant="body1">
													<strong>Price: </strong>
												</Typography>
											</Grid>
											<Grid item xs={6}>
												<Typography variant="body1">
													<strong>£{product.price}</strong>
												</Typography>
											</Grid>
										</Grid>
									</ListItem>
									<ListItem>
										<Grid container>
											<Grid item xs={6}>
												<Typography variant="body1">
													<strong>Status:</strong>
												</Typography>
											</Grid>
											<Grid item xs={6}>
												<Typography variant="body1">
													<strong>
														{product.countInStock > 0 ? (
															' In Stock'
														) : (
															<span style={{ color: 'red' }}>
																Out Of Stock
															</span>
														)}
													</strong>
												</Typography>
											</Grid>
										</Grid>
									</ListItem>
									{product.countInStock > 0 && (
										<ListItem>
											<Grid container>
												<Grid item xs={6}>
													<Typography variant="body1">
														<strong>Qty:</strong>
													</Typography>
												</Grid>
												<Grid item xs={6}>
													<FormControl
														variant="outlined"
														style={{
															width: '70px',
															minWidth: '80px',
															padding: 0,
														}}
													>
														<Select
															variant="standard"
															labelId="demo-simple-select-outlined-label"
															id="demo-simple-select-outlined"
															value={qty}
															onChange={(e) =>
																setQty(e.target.value)
															}
														>
															{[
																...Array(
																	product.countInStock
																).keys(),
															].map((el) => (
																<MenuItem
																	key={'key' + el + 1}
																	value={el + 1}
																>
																	{el + 1}
																</MenuItem>
															))}
														</Select>
													</FormControl>
												</Grid>
											</Grid>
										</ListItem>
									)}
									{inCart && (
										<ListItem>
											<Grid container>
												<Grid item xs={6}>
													<Typography variant="body1">
														<strong>In Cart:</strong>
													</Typography>
												</Grid>
												<Grid item xs={6}>
													<Typography variant="body1">
														<strong>
															{
																cartItems[
																	cartItems
																		.map(
																			(item) => item.product
																		)
																		.indexOf(match.params.id)
																].qty
															}
														</strong>
													</Typography>
												</Grid>
											</Grid>
										</ListItem>
									)}
									<ListItem>
										<Button
											onClick={addToCartHandler}
											fullWidth
											variant="contained"
											disabled={product.countInStock === 0}
											color="secondary"
										>
											{arrHasKeyVal(
												cartItems,
												'product',
												match.params.id
											)
												? 'Update Cart'
												: 'Add To Cart'}
										</Button>
									</ListItem>
								</List>
							</Paper>
						</Grid>
						<Grid container>
							<Grid item md={6}>
								<Typography style={{ marginTop: '8px' }} variant="h6">
									REVIEWS
								</Typography>
								{product.reviews.length === 0 && (
									<Message>No reviews</Message>
								)}
								<List>
									{product.reviews.map((review) => (
										<div key={review._id}>
											<ListItem>
												<Box
													display="flex"
													flexDirection="column"
													style={{ marginLeft: '-8px' }}
												>
													<Box
														display="flex"
														// alignItems="flex-end"
														// justifyContent="flex-end"
													>
														<Ratingas
															value={review.rating}
															num={null}
														/>
														<Typography variant="body1">
															<strong
																style={{ marginLeft: '15px' }}
															>
																{review.name}
															</strong>
														</Typography>
													</Box>

													<Typography variant="body2">
														{review.createdAt.substring(0, 10)}
													</Typography>

													<Typography
														variant="body1"
														style={{ marginTop: '8px' }}
													>
														{review.comment}
													</Typography>
												</Box>
											</ListItem>
											<Divider />
										</div>
									))}
									{userInfo &&
									!arrHasKeyVal(
										product.reviews,
										'name',
										userInfo.name
									) ? (
										<>
											<ListItem>
												<Typography variant="body2">
													<strong>WRITE A CUSTOMER REVIEW</strong>
												</Typography>
											</ListItem>

											{errorProductReview && (
												<ListItem>
													<Message variant="error">
														{errorProductReview}
													</Message>
												</ListItem>
											)}

											{userInfo ? (
												<ListItem>
													<form
														onSubmit={submitHandler}
														style={{ width: '100%' }}
													>
														<Ratingas
															value={rating}
															num={null}
															edit={true}
															onReturn={(rating) =>
																setRating(rating)
															}
														/>

														<TextareaAutosize
															style={{ margin: '8px 0 4px 0' }}
															onChange={(e) =>
																setComment(e.target.value)
															}
															className="text-area"
															aria-label="minimum height"
															rowsMin={2}
															placeholder="Comment"
															value={comment}
															required
														/>
														<Button
															type="submit"
															variant="contained"
															color="secondary"
														>
															Submit
														</Button>
													</form>
												</ListItem>
											) : (
												<Message>
													Please{' '}
													<StyledLink to="/login">
														sign in
													</StyledLink>{' '}
													to write a review.
												</Message>
											)}
										</>
									) : (
										userInfo && (
											<Message
												variant="success"
												style={{ marginTop: '15px' }}
											>
												You have reviewed this product!
											</Message>
										)
									)}
								</List>
							</Grid>
						</Grid>
					</Grid>
				</>
			)}
		</ProductScreenWrapper>
	);
};

export default ProductScreen;
