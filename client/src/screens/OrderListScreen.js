import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography } from '@material-ui/core';
import Loader from 'components/Loader';
import Message from 'components/Message';
import { listOrders } from '../actions/orderActions';
import CloseIcon from '@material-ui/icons/Close';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Meta from 'components/Meta';

const OrderListScreen = ({ history }) => {
	const dispatch = useDispatch();

	const orderList = useSelector((state) => state.orderList);
	const { loading, error, orders } = orderList;

	console.log(orders);

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	React.useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			console.log('get');
			dispatch(listOrders());
		} else {
			history.push('/login');
		}
	}, [dispatch, userInfo, history]);

	const editHandler = (_id) => {
		history.push(`/order/${_id}`);
	};
	return (
		<>
			<Meta title={'DemoShop | Admin area'} />
			<Typography variant="h5">ORDERS</Typography>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="error">{error}</Message>
			) : (
				<TableContainer component={Paper}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell>USER</TableCell>
								<TableCell>DATE</TableCell>
								<TableCell>TOTAL PRICE</TableCell>
								<TableCell>PAID</TableCell>
								<TableCell>DELIVERED</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{orders &&
								orders.map((order) => (
									<TableRow key={order._id}>
										<TableCell component="th" scope="row">
											{order._id}
										</TableCell>
										<TableCell>
											{order.user && order.user.name}
										</TableCell>
										<TableCell>
											{order.createdAt.substring(0, 10)}
										</TableCell>
										<TableCell>
											£{order.totalPrice.toFixed(2)}
										</TableCell>
										<TableCell>
											{order.isPaid ? (
												order.paidAt.substring(0, 10)
											) : (
												<CloseIcon style={{ color: 'red' }} />
											)}
										</TableCell>
										<TableCell>
											{order.isDelivered ? (
												order.deliveredAt.substring(0, 10)
											) : (
												<CloseIcon style={{ color: 'red' }} />
											)}
										</TableCell>
										<TableCell>
											<Button
												onClick={() => editHandler(order._id)}
												variant="outlined"
											>
												DETAILS
											</Button>
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</>
	);
};

export default OrderListScreen;
