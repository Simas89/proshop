import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';
import { SYSTEM_MENU_TOGGLE } from 'constants/systemConstants';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import {
	Drawer,
	IconButton,
	List,
	ListItem,
	Typography,
	Button,
	Box,
	Divider,
	Badge,
	Zoom,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const StyledDrawer = styled(Drawer)`
	.MuiDrawer-paper {
		width: 100%;
		display: flex;
		/* justify-content: center; */
		align-items: center;
		background-color: ${(p) => p.theme.palette.primary.main};
		padding: 0 24px;
		.top {
			width: 100%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 68px;

			border-bottom: 1px solid gray;
			margin-bottom: 30px;
			.icon {
				color: white;
				margin-left: auto;
			}
		}
		.typography {
			color: white;
		}
	}
`;

const SideMenu = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const systemMenu = useSelector((state) => state.sytemMenu);
	const { isMenuOpen } = systemMenu;

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	return (
		<StyledDrawer variant="persistent" anchor="right" open={isMenuOpen}>
			<div className="top">
				<Zoom in={isMenuOpen} timeout={600}>
					<IconButton
						className="icon"
						onClick={() =>
							dispatch({ type: SYSTEM_MENU_TOGGLE, payload: false })
						}
					>
						<CloseIcon />
					</IconButton>
				</Zoom>
			</div>

			<List>
				<ListItem>
					<Badge
						color="secondary"
						badgeContent={cartItems.reduce(
							(acc, item) => acc + item.qty,
							0
						)}
					>
						<Button
							disableRipple
							onClick={() => {
								history.push('/cart');
								dispatch({ type: SYSTEM_MENU_TOGGLE, payload: false });
							}}
						>
							<Typography variant="h4" className="typography">
								CART
							</Typography>
						</Button>
					</Badge>
				</ListItem>
				{userInfo ? (
					<>
						<Divider style={{ width: '100%', backgroundColor: 'gray' }} />
						<ListItem>
							<Button
								disableRipple
								onClick={() => {
									history.push('/profile');
									dispatch({
										type: SYSTEM_MENU_TOGGLE,
										payload: false,
									});
								}}
							>
								<Typography variant="h4" className="typography">
									PROFILE
								</Typography>
							</Button>
						</ListItem>
						<ListItem>
							<Button
								disableRipple
								onClick={() => {
									dispatch(logout());
									dispatch({
										type: SYSTEM_MENU_TOGGLE,
										payload: false,
									});
								}}
							>
								<Typography variant="h4" className="typography">
									LOGOUT
								</Typography>
							</Button>
						</ListItem>
					</>
				) : (
					<ListItem>
						<Button
							disableRipple
							onClick={() => {
								history.push('/login');
								dispatch({ type: SYSTEM_MENU_TOGGLE, payload: false });
							}}
						>
							<Typography variant="h4" className="typography">
								SIGN IN
							</Typography>
						</Button>
					</ListItem>
				)}
				{userInfo && userInfo.isAdmin && (
					<>
						<Divider style={{ width: '100%', backgroundColor: 'gray' }} />
						<ListItem>
							<Button
								disableRipple
								onClick={() => {
									history.push('/admin/userlist');
									dispatch({
										type: SYSTEM_MENU_TOGGLE,
										payload: false,
									});
								}}
							>
								<Typography variant="h4" className="typography">
									USERS
								</Typography>
							</Button>
						</ListItem>
						<ListItem>
							<Button
								disableRipple
								onClick={() => {
									history.push('/admin/productlist');
									dispatch({
										type: SYSTEM_MENU_TOGGLE,
										payload: false,
									});
								}}
							>
								<Typography variant="h4" className="typography">
									PRODUCTS
								</Typography>
							</Button>
						</ListItem>
						<ListItem>
							<Button
								disableRipple
								onClick={() => {
									history.push('/admin/orderlist');
									dispatch({
										type: SYSTEM_MENU_TOGGLE,
										payload: false,
									});
								}}
							>
								<Typography variant="h4" className="typography">
									ORDERS
								</Typography>
							</Button>
						</ListItem>
					</>
				)}
			</List>
		</StyledDrawer>
	);
};

export default SideMenu;
