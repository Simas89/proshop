import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography } from '@material-ui/core';
import Loader from 'components/Loader';
import Message from 'components/Message';
import { listUsers, deleteUser } from '../actions/userActions';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import ButtonGroup from '@material-ui/core/ButtonGroup';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Meta from 'components/Meta';

const UserListScreen = ({ history }) => {
	const dispatch = useDispatch();

	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDelete = useSelector((state) => state.userDelete);
	const { success: successDelete } = userDelete;

	React.useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers());
		} else {
			history.push('/login');
		}
	}, [dispatch, successDelete, userInfo, history]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteUser(id));
		}
	};
	const editHandler = (id) => {
		history.push(`/admin/user/${id}/edit`);
	};
	return (
		<>
			<Meta title={'DemoShop | Admin area'} />
			<Typography variant="h5">USERS</Typography>
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
								<TableCell>NAME</TableCell>
								<TableCell>EMAIL</TableCell>
								<TableCell>ADMIN</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users &&
								users.map((user) => (
									<TableRow key={user._id}>
										<TableCell component="th" scope="row">
											{user._id}
										</TableCell>
										<TableCell>{user.name}</TableCell>
										<TableCell>
											<a href={user.email}>{user.email}</a>
										</TableCell>
										<TableCell>
											{user.isAdmin ? (
												<CheckIcon style={{ color: 'green' }} />
											) : (
												<CloseIcon style={{ color: 'red' }} />
											)}
										</TableCell>
										<TableCell>
											<ButtonGroup>
												<Button>
													<EditIcon
														onClick={() => editHandler(user._id)}
													/>
												</Button>

												<Button>
													<DeleteIcon
														style={{ color: 'red' }}
														onClick={() =>
															deleteHandler(user._id)
														}
													/>
												</Button>
											</ButtonGroup>
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

export default UserListScreen;
