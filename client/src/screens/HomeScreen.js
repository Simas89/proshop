import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Grid, Typography } from '@material-ui/core';
import Product from 'components/Product';
import Loader from 'components/Loader';
import Message from 'components/Message';
import Paginate from 'components/Paginate';
import Meta from 'components/Meta';
import FeaturedProductsSelect from 'components/FeaturedProductsSelect';
import TopProducts from 'components/TopProducts';

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const HomeScreen = ({ match }) => {
	const [category, setCategory] = React.useState(
		match.params.category || 'toprated'
	);
	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	// console.log(match.url === '/');
	// console.log(match);

	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { loading, error, products, page, pages } = productList;

	React.useEffect(() => {
		if (category !== 'toprated' && category !== 'latest')
			dispatch(listProducts(keyword, pageNumber, category));
	}, [dispatch, keyword, pageNumber, category]);

	React.useEffect(() => {
		if (match.params.category) setCategory(match.params.category);

		if (match.path.split('/')[1] === 'search') setCategory('');
		// if (match.path.split('/')[1] === 'page') setCategory('');
	}, [category, match]);

	return (
		<>
			<Meta
				title={`Welcome to DemoShop | ${
					category !== 'latest' && category !== 'toprated'
						? capitalizeFirstLetter(category)
						: 'Home'
				}`}
			/>
			{match.url === '/' ? (
				<>
					<FeaturedProductsSelect
						category={category}
						setCategory={setCategory}
					/>
					<TopProducts category={category} />
				</>
			) : (
				<Typography variant="h5" style={{ marginBottom: '20px' }}>
					{category.toUpperCase()}
				</Typography>
			)}
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
					<Paginate
						page={page}
						pages={pages}
						keyword={keyword}
						category={category}
					/>
				</>
			)}
		</>
	);
};

export default HomeScreen;
