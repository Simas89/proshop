import React from 'react';
import { Grid, Container } from '@material-ui/core';

const FormContainer = ({ children }) => {
	return (
		<Container>
			<Grid container justify="center">
				<Grid item xs={12} md={6}>
					{children}
				</Grid>
			</Grid>
		</Container>
	);
};

export default FormContainer;
