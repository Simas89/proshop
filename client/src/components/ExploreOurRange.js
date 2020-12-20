import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Grid, Paper, Card, Typography } from '@material-ui/core';

const Wrapper = styled.div`
	height: 940px;
	${(props) => props.theme.breakpoints.down('sm')} {
		height: 1340px;
	}
	.main {
		height: 700px;
		${(props) => props.theme.breakpoints.down('sm')} {
			height: 1140px;
		}
		/* max-width: 900px; */
		margin-top: 30px;
		padding: 16px;
	}
	.paper {
		margin-top: 20px;
		height: 380px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		transition: transform 0.3s;

		&:hover {
			transform: translateY(-4px);
			transition: transform 0.3s;
			cursor: pointer;
		}
		.media {
			height: 310px;

			background-position: center;
			background-size: cover;
		}
		.tech {
			background-image: url('/images/tech.jpg');
		}
		.outdoors {
			background-image: url('/images/outdoors.jfif');
		}
		.misc {
			background-image: url('/images/misc.jpg');
		}
		.title {
			padding: 16px;
			text-align: center;
		}
	}
`;

const ExploreOurRange = () => {
	const history = useHistory();

	return (
		<Wrapper>
			<Paper className="main">
				<Typography variant="h6">EXPLORE OUR RANGE</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12} md={12}>
						<Paper
							className="paper "
							elevation={6}
							onClick={() => history.push('/category/tech')}
						>
							<div className="media tech"></div>
							<Typography variant="h6" className="title">
								TECH
							</Typography>
						</Paper>
					</Grid>
					<Grid item xs={12} md={6}>
						<Paper
							className="paper"
							elevation={6}
							onClick={() => history.push('/category/outdoors')}
						>
							<div className="media outdoors"></div>
							<Typography variant="h6" className="title">
								OUTDOORS
							</Typography>
						</Paper>
					</Grid>
					<Grid item xs={12} md={6}>
						<Paper
							className="paper"
							elevation={6}
							onClick={() => history.push('/category/miscellaneous')}
						>
							<div className="media misc"></div>
							<Typography variant="h6" className="title">
								MISCELLANEOUS
							</Typography>
						</Paper>
					</Grid>
				</Grid>
			</Paper>
		</Wrapper>
	);
};

export default ExploreOurRange;
