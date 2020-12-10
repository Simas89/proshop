import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const RatingWrapper = styled.div`
	margin-top: auto;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;

const Ratingas = ({ value, num }) => {
	return (
		<RatingWrapper>
			<Rating
				precision={0.5}
				max={5}
				onChange={(event, newValue) => {
					console.log(newValue);
				}}
				name="read-only"
				value={value}
				readOnly
			/>
			<Typography variant="body1" color="textPrimary">
				({num})
			</Typography>
		</RatingWrapper>
	);
};

export default Ratingas;
