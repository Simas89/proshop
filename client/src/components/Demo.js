import { Button } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Particles from 'react-particles-js';
import { useHistory } from 'react-router-dom';

const Wrapper = styled.div`
	@font-face {
		font-family: 'Xeno';
		font-style: normal;
		font-weight: normal;
		src: local('Xeno'), url('/xeno.otf') format('truetype');
	}

	position: relative;
	height: 550px;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	/* background-color: ${(p) => p.theme.palette.primary.main}; */
	background: radial-gradient(
		${(p) => p.theme.palette.primary.light},
		${(p) => p.theme.palette.primary.dark}
	);
	margin-top: -100px;

	.particles {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.cyber-punk {
		z-index: 10;
		margin-top: 20px;
		img {
			max-width: 100%;
		}
	}

	.btn {
		z-index: 10;
		position: absolute;
		bottom: 20px;
		color: #ffef00;
		/* margin-top: 136px; */
		font-family: 'Xeno';
		font-size: 3rem;
		${(props) => props.theme.breakpoints.down('md')} {
			font-size: 2rem;
		}
		border: none;
		margin: 0;
		text-shadow: 2px 2px #52bddc;
	}
`;

const Demo = () => {
	const history = useHistory();
	const theme = useTheme();
	const md = useMediaQuery(theme.breakpoints.up('md'));
	const lg = useMediaQuery(theme.breakpoints.up('lg'));

	console.log(md, lg);
	return (
		<Wrapper>
			<Particles
				className="particles"
				params={{
					particles: {
						number: {
							value: `${lg ? 70 : md ? 50 : 30}`,
						},
						size: {
							value: 2,
						},
					},
				}}
			/>
			<div className="cyber-punk">
				<img src="images/cyber.png" alt="cyber-logo" />
			</div>

			<Button
				onClick={() => history.push('/product/5fde040261f1bf106c8e72b3')}
				className="btn"
				variant="outlined"
				disableRipple
			>
				<span>BUY NOW</span>
			</Button>
		</Wrapper>
	);
};

export default Demo;
