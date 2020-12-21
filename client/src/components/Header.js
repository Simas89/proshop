import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SYSTEM_MENU_TOGGLE } from 'constants/systemConstants';
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
	Badge,
	IconButton,
	Zoom,
} from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import SearchBox from 'components/SearchBox';
import StyledLink from 'components/StyledLink';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';

const HeaderWrapper = styled.div`
	position: fixed;
	z-index: 100;
	width: 100%;
	.app-bar {
		height: 100px;
		justify-content: center;
		.tool-bar {
			/* border: 1px solid red; */
			padding: 0;
			.logo {
				margin-right: 20px;
			}
			.real-logo {
				border: 2px solid white;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 40px;
				height: 40px;
				margin-right: 10px;
			}
			.item {
				height: 46px;
				/* border: 1px solid green; */
				display: flex;
				justify-content: center;
				align-items: center;
				&:hover {
					cursor: pointer;
				}
			}
		}
		.cat-bar {
			border-top: 1px solid gray;
			height: 30px;
			display: flex;
			align-items: center;
			justify-content: center;
			.cat-element {
				color: white;
				margin: 0 8px;
				font-weight: 100;
			}
		}
	}

	.button {
		color: white;
		font-size: 0.8rem;
		background-color: transparent;
	}
	.link {
		color: white;
		text-decoration: none;
		/* border: 1px solid red; */
	}
`;

const Header = ({ window }) => {
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [anchorElAdmin, setAnchorElAdmin] = React.useState(null);

	const systemMenu = useSelector((state) => state.sytemMenu);
	const { isMenuOpen } = systemMenu;

	const theme = useTheme();
	const md = useMediaQuery(theme.breakpoints.up('md'));

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

	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		threshold: 100,
		disableHysteresis: true,
	});

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			<HeaderWrapper>
				<AppBar position="static" className="app-bar">
					<Container>
						<Toolbar className="tool-bar">
							<StyledLink to="/" className="link">
								{md ? (
									<Typography className="logo" variant="h6">
										DEMO-SHOP
									</Typography>
								) : (
									<div className="real-logo">
										<Typography variant="h6">D</Typography>
									</div>
								)}
							</StyledLink>

							<SearchBox />

							<Box flexGrow={1} />

							{md ? (
								<>
									{userInfo ? (
										<>
											<div onClick={handleClick} className="item">
												<Button
													className="button link"
													aria-controls="simple-menu"
													aria-haspopup="true"
													disableRipple
												>
													{userInfo.name}
													<span
														style={{
															fontSize: '.5rem',
															marginLeft: '5px',
														}}
													>
														▼
													</span>
												</Button>
											</div>
											<Menu
												id="simple-menu"
												anchorEl={anchorEl}
												keepMounted
												open={Boolean(anchorEl)}
												onClose={handleClose}
											>
												<StyledLink
													to="/profile"
													className="title link"
												>
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
											<div className="item">
												<Button
													disableRipple
													className="button"
													startIcon={<PersonIcon />}
												>
													SIGN IN
												</Button>
											</div>
										</Link>
									)}
									{userInfo && userInfo.isAdmin && (
										<>
											<div
												onClick={handleClickAdmin}
												className="item"
											>
												<Button
													disableRipple
													className="button link"
													aria-controls="simple-menu"
													aria-haspopup="true"
												>
													Admin
													<span
														style={{
															fontSize: '.5rem',
															marginLeft: '5px',
														}}
													>
														▼
													</span>
												</Button>
											</div>
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
									)}{' '}
									<Link to="/cart" className="link">
										<div className="item">
											<Button className="button" disableRipple>
												<Badge
													badgeContent={cartItems.reduce(
														(acc, item) => acc + item.qty,
														0
													)}
													color="secondary"
												>
													<ShoppingBasketIcon />
												</Badge>
											</Button>
										</div>
									</Link>
								</>
							) : (
								<Zoom in={!isMenuOpen} timeout={500}>
									<IconButton
										className="button"
										onClick={() =>
											dispatch({
												type: SYSTEM_MENU_TOGGLE,
												payload: !isMenuOpen,
											})
										}
									>
										<Badge
											badgeContent={cartItems.reduce(
												(acc, item) => acc + item.qty,
												0
											)}
											color="secondary"
										>
											<MenuIcon />
										</Badge>
									</IconButton>
								</Zoom>
							)}
						</Toolbar>
						<div className="cat-bar">
							<StyledLink to="/" className="cat-element">
								<Typography variant="body2">Home</Typography>
							</StyledLink>
							<Typography className="cat-element" variant="body2">
								|
							</Typography>

							<StyledLink to="/category/tech" className="cat-element">
								<Typography variant="body2">Tech</Typography>
							</StyledLink>
							<StyledLink
								to="/category/outdoors"
								className="cat-element"
							>
								<Typography variant="body2">Outdoors</Typography>
							</StyledLink>
							<StyledLink
								to="/category/miscellaneous"
								className="cat-element"
							>
								<Typography variant="body2">Miscellaneous</Typography>
							</StyledLink>
						</div>
						{/* <SearchBox /> */}
					</Container>
				</AppBar>
			</HeaderWrapper>
		</Slide>
	);
};

export default Header;
