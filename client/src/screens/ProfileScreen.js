import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, TextField, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Loader from 'components/Loader';
import Message from 'components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from 'constants/userConstants';
import StyledLink from 'components/StyledLink';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import ClearIcon from '@material-ui/icons/Clear';
import Meta from 'components/Meta';

const useStyles = makeStyles({
	marginVer: {
		margin: '10px 0',
	},
});

const ProfileScreen = ({ location, history }) => {
	const classes = useStyles();
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [confirmPassword, setConfirmPassword] = React.useState('');
	const [message, setMessage] = React.useState(null);

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile;

	const orderListMy = useSelector((state) => state.orderListMy);
	const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

	// console.log(userDetails);
	React.useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			try {
				if (!user || !user.name || success) {
					dispatch({ type: USER_UPDATE_PROFILE_RESET });
					dispatch(getUserDetails('profile'));
					dispatch(listMyOrders());
				} else {
					setName(user.name);
					setEmail(user.email);
				}
			} catch (error) {
				console.error(error);
				dispatch(getUserDetails('profile'));
				dispatch(listMyOrders());
			}
		}
	}, [history, userInfo, dispatch, user, success]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
		} else {
			dispatch(updateUserProfile({ id: user._id, name, email, password }));
		}
	};
	return (
		<>
			<Meta title={`DemoShop | ${userInfo && userInfo.name}`} />
			<Grid container spacing={2}>
				<Grid item md={3}>
					<Typography className={classes.marginVer} variant="h5">
						USER PROFILE
					</Typography>
					{message && <Message variant="error">{message}</Message>}
					{error && <Message variant="error">{error}</Message>}
					{success && <Message variant="success">Profile Updated</Message>}
					{loading && <Loader />}
					<form onSubmit={submitHandler}>
						<TextField
							className={classes.marginVer}
							onChange={(e) => setName(e.target.value)}
							value={name}
							style={{ width: '100%' }}
							variant="outlined"
							type="name"
							id="name"
							label="Name"
						/>
						<TextField
							className={classes.marginVer}
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							style={{ width: '100%' }}
							variant="outlined"
							type="email"
							id="email"
							label="Email"
						/>
						<TextField
							className={classes.marginVer}
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							style={{ width: '100%' }}
							variant="outlined"
							type="password"
							id="password"
							label="Password"
						/>
						<TextField
							className={classes.marginVer}
							onChange={(e) => setConfirmPassword(e.target.value)}
							value={confirmPassword}
							style={{ width: '100%' }}
							variant="outlined"
							type="password"
							id="confirmPassword"
							label="Confirm password"
						/>
						<Button
							className={classes.marginVer}
							variant="contained"
							color="primary"
							type="submit"
						>
							Update
						</Button>
					</form>
				</Grid>
				<Grid item xs={12} md={9}>
					<Typography className={classes.marginVer} variant="h5">
						MY ORDERS
					</Typography>
					{loadingOrders ? (
						<Loader />
					) : errorOrders ? (
						<Message variant="error">{errorOrders}</Message>
					) : (
						<TableContainer component={Paper}>
							<Table aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell align="left">ID</TableCell>
										<TableCell align="left">PAID</TableCell>
										<TableCell align="left">DELIVERED</TableCell>
										<TableCell align="left">TOTAL</TableCell>
										<TableCell align="left">DATE</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{orders.map((order) => (
										<TableRow key={order._id}>
											<TableCell align="left">
												<StyledLink to={`/order/${order._id}`}>
													<strong>{order._id}</strong>
												</StyledLink>
											</TableCell>
											<TableCell align="left">
												{order.isPaid ? (
													order.paidAt.substring(0, 10)
												) : (
													<ClearIcon style={{ color: 'red' }} />
												)}
											</TableCell>
											<TableCell align="left">
												{order.isDelivered ? (
													order.deliveredAt.substring(0, 10)
												) : (
													<ClearIcon style={{ color: 'red' }} />
												)}
											</TableCell>
											<TableCell align="left">
												£{order.totalPrice.toFixed(2)}
											</TableCell>
											<TableCell align="left">
												{order.createdAt.substring(0, 10)}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					)}
				</Grid>
			</Grid>
		</>
	);
};

export default ProfileScreen;
