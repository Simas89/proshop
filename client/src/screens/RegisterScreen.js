import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Loader from 'components/Loader';
import Message from 'components/Message';
import { register } from '../actions/userActions';
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

const RegisterScreen = ({ location, history }) => {
	const classes = useStyles();
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [confirmPassword, setConfirmPassword] = React.useState('');
	const [message, setMessage] = React.useState(null);
	const dispatch = useDispatch();

	const userRegister = useSelector((state) => state.userRegister);

	const { loading, error, userInfo } = userRegister;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	React.useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
		} else {
			dispatch(register(name, email, password));
		}
	};
	return (
		<FormContainer>
			<Typography className={classes.marginVer} variant="h5">
				SIGN UP
			</Typography>
			{message && <Message variant="error">{message}</Message>}
			{error && <Message variant="error">{error}</Message>}
			{loading && <Loader />}
			<form onSubmit={submitHandler}>
				<TextField
					className={classes.marginVer}
					onChange={(e) => setName(e.target.value)}
					value={name}
					style={{ width: '100%' }}
					variant="outlined"
					required
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
				<TextField
					className={classes.marginVer}
					onChange={(e) => setConfirmPassword(e.target.value)}
					value={confirmPassword}
					style={{ width: '100%' }}
					variant="outlined"
					required
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
					Register
				</Button>
			</form>

			<Typography variant="body1">
				Have an Account?{' '}
				<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
					Login
				</Link>
			</Typography>
		</FormContainer>
	);
};

export default RegisterScreen;
