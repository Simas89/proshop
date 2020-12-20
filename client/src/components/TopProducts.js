import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listTopProducts } from '../actions/productActions';
import { PRODUCT_LIST_RESET } from 'constants/productConstants';
import { Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Product from 'components/Product';
import Loader from 'components/Loader';
import Message from 'components/Message';

const TopProducts = ({ category }) => {
	const dispatch = useDispatch();
	const productTop = useSelector((state) => state.productTop);

	const { loading, error, products } = productTop;

	const theme = useTheme();

	const sm = useMediaQuery(theme.breakpoints.up('sm'));
	const lg = useMediaQuery(theme.breakpoints.up('lg'));

	React.useLayoutEffect(() => {
		dispatch({ type: PRODUCT_LIST_RESET });
	}, [dispatch, category]);
	React.useEffect(() => {
		dispatch(listTopProducts(category));
	}, [dispatch, category]);

	return (
		<div style={{ height: `${lg ? 360 : sm ? 690 : 1370}px` }}>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="error">{error}</Message>
			) : (
				<>
					<Grid container spacing={2}>
						{products.map((element, index) => (
							<Grid item xs={12} sm={6} lg={3} key={element._id}>
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
