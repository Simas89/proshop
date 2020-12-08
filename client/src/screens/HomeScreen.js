import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Grid, Typography } from '@material-ui/core';
import Product from 'components/Product';
import Loader from 'components/Loader';
import Message from 'components/Message';

const HomeScreen = () => {
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;
	React.useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	return (
		<>
			<Typography variant="h4">LATEST PRODUCTS</Typography>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="error">{error}</Message>
			) : (
				<Grid container spacing={2}>
					{products.map((element, index) => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={element._id}>
							<Product product={element} />
						</Grid>
					))}
				</Grid>
			)}
		</>
	);
};

export default HomeScreen;
