import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Loader from 'components/Loader';
import Message from 'components/Message';
import { login } from '../actions/userActions';
import FormContainer from 'components/FormContainer';

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

const LoginScreen = ({ location, history }) => {
	const classes = useStyles();
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);

	const { loading, error, userInfo } = userLogin;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	React.useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};
	return (
		<FormContainer>
			<Typography className={classes.marginVer} variant="h5">
				SIGN IN
			</Typography>
			{error && <Message variant="error">{error}</Message>}
			{loading && <Loader />}
			<form onSubmit={submitHandler}>
				<TextField
					className={classes.marginVer}
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					style={{ width: '100%' }}
					variant="outlined"
					required
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
					required
					type="password"
					id="password"
					label="Password"
				/>
				<Button
					className={classes.marginVer}
					variant="contained"
					color="primary"
					type="submit"
				>
					Sign In
				</Button>
			</form>

			<Typography variant="body1">
				New Customer?{' '}
				<Link
					to={redirect ? `/register?redirect=${redirect}` : '/register'}
				>
					Register
				</Link>
			</Typography>
		</FormContainer>
	);
};

export default LoginScreen;
