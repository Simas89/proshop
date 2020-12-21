import React from 'react';
import { Container, Typography } from '@material-ui/core';
import styled from 'styled-components';
const StyledFooter = styled.footer`
	/* border: 1px solid red; */
	height: 50px;
	background-color: ${(p) => p.theme.palette.primary.main};
	margin-top: 30px;

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		color: white;
	}
`;

const Footer = () => {
	return (
		<StyledFooter>
			<Container className="container">
				<Typography variant="body1">Copyright &copy; DemoShop</Typography>
			</Container>
		</StyledFooter>
	);
};

export default Footer;
