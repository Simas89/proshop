import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

const Footer = () => {
	return (
		<footer style={{ margin: '30px 0 10px 0' }}>
			<Container>
				<Grid container justify="center" alignItems="center">
					<Typography variant="body1">
						Copyright &copy; DemoShop
					</Typography>
				</Grid>
			</Container>
		</footer>
	);
};

export default Footer;
