import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
	Typography,
	CardMedia,
	CardContent,
	CardActionArea,
	Card,
} from '@material-ui/core';
import Ratingas from 'components/Ratingas';

const CardStyled = styled(Card)`
	max-width: 345;
	height: 100%;
	position: relative;

	display: flex;
	flex-direction: column;
	.media {
		height: 200px;
	}
	a {
		text-decoration: none;
		&:hover {
			text-decoration: underline;
		}
	}
	.content {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.rating {
		margin-top: auto;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
`;

const Product = ({ product }) => {
	return (
		<CardStyled>
			<CardActionArea>
				<Link to={`/product/${product._id}`}>
					<CardMedia
						className="media"
						image={product.image}
						title={product.name}
					/>
				</Link>
			</CardActionArea>
			<CardContent className="content">
				<Link to={`/product/${product._id}`}>
					<Typography gutterBottom variant="body1" color="textPrimary">
						{product.name}
					</Typography>
				</Link>
				<div>
					<Ratingas value={product.rating} num={product.numReviews} />
					<Typography variant="h6">${product.price}</Typography>
				</div>
			</CardContent>

			{/* <CardActions>
				<Button size="small" color="primary">
					Share
				</Button>
				<Button size="small" color="primary">
					Learn More
				</Button>
			</CardActions> */}
		</CardStyled>
	);
};

export default Product;
