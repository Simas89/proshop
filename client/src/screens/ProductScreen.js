import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
	Button,
	Typography,
	Grid,
	List,
	ListItem,
	Divider,
} from '@material-ui/core';
import Ratingas from 'components/Ratingas';
import products from 'products';

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
	const product = products.find((element) => element._id === match.params.id);

	return (
		<ProductScreenWrapper>
			<Link to="/" className="link">
				<Button variant="text">Go Back</Button>
			</Link>
			<Grid container>
				<Grid item xs={6}>
					<div className="img-div">
						<img src={product.image} />
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
								Price: ${product.price}
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
										<strong>${product.price}</strong>
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
		</ProductScreenWrapper>
	);
};

export default ProductScreen;
