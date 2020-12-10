import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
	Container,
	Button,
	Typography,
	Toolbar,
	AppBar,
	Menu,
	MenuItem,
} from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import PersonIcon from '@material-ui/icons/Person';

const StyledLink = styled(Link)`
	text-decoration: none;
	color: ${(p) => p.theme.palette.text.primary};

	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active {
		text-decoration: none;
	}
`;

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
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const logoutHandler = () => {
		dispatch(logout());
	};
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
						{userInfo ? (
							<>
								<Button
									className="button link"
									aria-controls="simple-menu"
									aria-haspopup="true"
									onClick={handleClick}
								>
									{userInfo.name}
									<span
										style={{ fontSize: '.5rem', marginLeft: '5px' }}
									>
										▼
									</span>
								</Button>
								<Menu
									id="simple-menu"
									anchorEl={anchorEl}
									keepMounted
									open={Boolean(anchorEl)}
									onClose={handleClose}
								>
									<StyledLink to="/profile" className="title link">
										<MenuItem
											onClick={() => {
												handleClose();
											}}
										>
											<Typography className="menu-item">
												Profile
											</Typography>
										</MenuItem>
									</StyledLink>
									<MenuItem
										onClick={() => {
											logoutHandler();
											handleClose();
										}}
									>
										Logout
									</MenuItem>
								</Menu>
							</>
						) : (
							<Link to="/login" className="link">
								<Button className="button" startIcon={<PersonIcon />}>
									SIGN IN
								</Button>
							</Link>
						)}
					</Toolbar>
				</Container>
			</AppBar>
		</HeaderWrapper>
	);
};

export default Header;
