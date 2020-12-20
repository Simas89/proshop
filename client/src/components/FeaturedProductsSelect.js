import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

const Wrapper = styled.div`
	/* border: 1px solid red; */
	height: 50px;
	position: relative;
	margin-bottom: 16px;
	display: flex;
	.item {
		position: relative;
		/* border: 1px solid red; */
		height: 100%;
		z-index: 10;
		padding: 10px 30px 0 30px;
		width: 200px;
		${(props) => props.theme.breakpoints.down('sm')} {
			width: 50%;
		}
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;

		&:hover {
			cursor: pointer;
		}
		.item-bottom {
			position: absolute;
			bottom: 0;
			left: 0;
			height: 5px;
			width: 100%;
			background-color: ${(p) => p.theme.palette.secondary.main};
		}
	}
	.bottom {
		position: absolute;
		bottom: 0;
		height: 5px;
		width: 100%;
		background-color: ${(p) => p.theme.palette.primary.light};
		z-index: 1;
	}
`;

const FeaturedProductsSelect = ({ category, setCategory }) => {
	return (
		<Wrapper>
			<div className="item" onClick={() => setCategory('toprated')}>
				<Typography variant="h6">TOP RATED</Typography>
				{category === 'toprated' && <div className="item-bottom"></div>}
			</div>
			<div className="item" onClick={() => setCategory('latest')}>
				<Typography variant="h6">LATEST</Typography>
				{category === 'latest' && <div className="item-bottom"></div>}
			</div>
			<div className="bottom"></div>
		</Wrapper>
	);
};

export default FeaturedProductsSelect;
