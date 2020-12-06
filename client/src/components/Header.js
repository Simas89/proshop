import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
	Container,
	Button,
	Typography,
	Toolbar,
	AppBar,
} from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import PersonIcon from '@material-ui/icons/Person';

const HeaderWrapper = styled.div`
	.root {
		flex-grow: 1;
	}
	.title {
		flex-grow: 1;
	}

	.button {
		margin-left: ${(p) => p.theme.spacing(1)}px;
		color: white;
	}
	.link {
		color: white;
		text-decoration: none;
	}
`;

const Header = () => {
	return (
		<HeaderWrapper className="root">
			<AppBar position="static">
				<Container>
					<Toolbar>
						<Link to="/" className="title link">
							<Typography variant="h6">PROSHOP</Typography>
						</Link>
						<Link to="/cart" className="link">
							<Button
								className="button link"
								startIcon={<ShoppingBasketIcon />}
							>
								CART
							</Button>
						</Link>
						<Link to="/login" className="link">
							<Button className="button" startIcon={<PersonIcon />}>
								SIGN IN
							</Button>
						</Link>
					</Toolbar>
				</Container>
			</AppBar>
		</HeaderWrapper>
	);
};

export default Header;
