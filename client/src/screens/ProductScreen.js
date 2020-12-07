import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Typography, Grid, List, ListItem } from '@material-ui/core';
import Ratingas from 'components/Ratingas';
import Loader from 'components/Loader';
import Message from 'components/Message';

import { listProductDetails } from '../actions/productActions';

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
`;

const ProductScreen = ({ match }) => {
	const dispatch = useDispatch();
	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;
	React.useEffect(() => {
		dispatch(listProductDetails(match.params.id));
	}, [dispatch, match.params.id]);

	return (
		product && (
			<ProductScreenWrapper>
				<Link to="/" className="link">
					<Button variant="text">Go Back</Button>
				</Link>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="error">{error}</Message>
				) : (
					<Grid container>
						<Grid item xs={6}>
							<div className="img-div">
								<img src={product.image} alt={product.name} />
							</div>
						</Grid>
						<Grid item xs={3}>
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
						<Grid item xs={3}>
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
													{product.countInStock > 0
														? ' In Stock'
														: ' Out Of Stock'}
												</strong>
											</Typography>
										</Grid>
									</Grid>
								</ListItem>
								<ListItem>
									<Button
										fullWidth
										variant="contained"
										color="primary"
										disabled={product.countInStock === 0}
									>
										Add To Cart
									</Button>
								</ListItem>
							</List>
						</Grid>
					</Grid>
				)}
			</ProductScreenWrapper>
		)
	);
};

export default ProductScreen;
