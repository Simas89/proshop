import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Grid, Typography } from '@material-ui/core';
import Product from 'components/Product';
import Loader from 'components/Loader';
import Message from 'components/Message';
import Paginate from 'components/Paginate';

const HomeScreen = ({ match }) => {
	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { loading, error, products, page, pages } = productList;
	React.useEffect(() => {
		dispatch(listProducts(keyword, pageNumber));
	}, [dispatch, keyword, pageNumber]);

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="error">{error}</Message>
			) : (
				<>
					<Typography variant="h4">LATEST PRODUCTS</Typography>
					<Grid container spacing={2}>
						{products.map((element, index) => (
							<Grid item xs={12} sm={6} md={4} lg={3} key={element._id}>
								<Product product={element} />
							</Grid>
						))}
					</Grid>
					<Paginate page={page} pages={pages} keyword={keyword} />
				</>
			)}
		</>
	);
};

export default HomeScreen;
