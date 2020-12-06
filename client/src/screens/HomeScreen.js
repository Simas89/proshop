import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import products from 'products.js';
import Product from 'components/Product';

const HomeScreen = () => {
	return (
		<>
			<Typography variant="h3">Latest Products</Typography>
			<Grid container spacing={2}>
				{products.map((element, index) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={element._id}>
						<Product product={element} />
					</Grid>
				))}
			</Grid>
		</>
	);
};

export default HomeScreen;
