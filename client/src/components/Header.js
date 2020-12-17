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
	Box,
} from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import PersonIcon from '@material-ui/icons/Person';
import SearchBox from 'components/SearchBox';
import StyledLink from 'components/StyledLink';

const HeaderWrapper = styled.div`
	.root {
		flex-grow: 1;
	}
	.app-bar {
		display: flex;
		height: 80px;
		justify-content: center;
	}

	.button {
		margin-left: ${(p) => p.theme.spacing(1)}px;
		color: white;
	}
	.link {
		color: white;
		text-decoration: none;
		margin-right: 16px;
	}
`;

const Header = () => {
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [anchorElAdmin, setAnchorElAdmin] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const logoutHandler = () => {
		dispatch(logout());
	};

	const handleClickAdmin = (event) => {
		setAnchorElAdmin(event.currentTarget);
	};
	const handleCloseAdmin = () => {
		setAnchorElAdmin(null);
	};
	return (
		<HeaderWrapper className="root">
			<AppBar position="static" className="app-bar">
				<Container>
					<Toolbar>
						<StyledLink to="/" className="link">
							<Typography variant="h6">DEMO-SHOP</Typography>
						</StyledLink>

						<SearchBox />

						<Box flexGrow={1} />
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
						{userInfo && userInfo.isAdmin && (
							<>
								<Button
									className="button link"
									aria-controls="simple-menu"
									aria-haspopup="true"
									onClick={handleClickAdmin}
								>
									Admin
									<span
										style={{ fontSize: '.5rem', marginLeft: '5px' }}
									>
										▼
									</span>
								</Button>
								<Menu
									id="simple-menu"
									anchorEl={anchorElAdmin}
									keepMounted
									open={Boolean(anchorElAdmin)}
									onClose={handleCloseAdmin}
								>
									<StyledLink
										to="/admin/userlist"
										className="title link"
									>
										<MenuItem
											onClick={() => {
												handleCloseAdmin();
											}}
										>
											<Typography className="menu-item">
												Users
											</Typography>
										</MenuItem>
									</StyledLink>
									<StyledLink
										to="/admin/productlist"
										className="title link"
									>
										<MenuItem
											onClick={() => {
												handleCloseAdmin();
											}}
										>
											<Typography className="menu-item">
												Products
											</Typography>
										</MenuItem>
									</StyledLink>
									<StyledLink
										to="/admin/orderlist"
										className="title link"
									>
										<MenuItem
											onClick={() => {
												handleCloseAdmin();
											}}
										>
											<Typography className="menu-item">
												Orders
											</Typography>
										</MenuItem>
									</StyledLink>
								</Menu>
							</>
						)}
					</Toolbar>
					{/* <SearchBox /> */}
				</Container>
			</AppBar>
		</HeaderWrapper>
	);
};

export default Header;
