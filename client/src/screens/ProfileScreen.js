import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, TextField, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Loader from 'components/Loader';
import Message from 'components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions';

const useStyles = makeStyles({
	root: {
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
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

	// console.log(userDetails);
	React.useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			if (!user.name) {
				dispatch(getUserDetails('profile'));
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [history, userInfo, dispatch, user]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
		} else {
			dispatch(updateUserProfile({ id: user._id, name, email, password }));
		}
	};
	return (
		<Grid container>
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
						label="name"
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
						id="password"
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
			<Grid item md={9}>
				<Typography variant="h5">MY ORDERS</Typography>
			</Grid>
		</Grid>
	);
};

export default ProfileScreen;
