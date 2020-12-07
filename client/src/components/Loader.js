import React from 'react';
import { CircularProgress, Box, Typography } from '@material-ui/core';

const Loader = () => {
	return (
		<Box display="grid">
			<CircularProgress
				thickness={1.5}
				size={80}
				style={{ margin: 'auto' }}
			/>
			<Typography
				variant="h6"
				style={{ margin: 'auto' }}
				color="textPrimary"
			>
				Loading...
			</Typography>
		</Box>
	);
};

export default Loader;
