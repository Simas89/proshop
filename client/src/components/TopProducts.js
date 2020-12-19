import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listTopProducts } from '../actions/productActions';
import { PRODUCT_LIST_RESET } from 'constants/productConstants';
import { Grid, Typography } from '@material-ui/core';
import Product from 'components/Product';
import Loader from 'components/Loader';
import Message from 'components/Message';

const selectState = {
	latest: 'productLatest',
	toprated: 'productTopRated',
};

const TopProducts = ({ category }) => {
	const dispatch = useDispatch();
	const productTop = useSelector((state) => state.productTop);

	const { loading, error, products } = productTop;

	React.useLayoutEffect(() => {
		dispatch({ type: PRODUCT_LIST_RESET });
	}, [dispatch, category]);
	React.useEffect(() => {
		dispatch(listTopProducts(category));
	}, [dispatch, category]);
	return (
		<div>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="error">{error}</Message>
			) : (
				<>
					<Grid container spacing={2}>
						{products.map((element, index) => (
							<Grid item xs={12} sm={6} md={4} lg={3} key={element._id}>
								<Product product={element} />
							</Grid>
						))}
					</Grid>
				</>
			)}
		</div>
	);
};

export default TopProducts;
