import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

const Footer = () => {
	return (
		<footer>
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
