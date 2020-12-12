import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Button,
	Typography,
	TextField,
	FormControlLabel,
	Checkbox,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Loader from 'components/Loader';
import Message from 'components/Message';
import { getUserDetails, updateUser } from '../actions/userActions';
import FormContainer from 'components/FormContainer';
import StyledLink from 'components/StyledLink';
import { USER_UPDATE_RESET } from 'constants/userConstants';

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

const UserEditScreen = ({ match, history }) => {
	const classes = useStyles();

	const userId = match.params.id;

	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [isAdmin, setIsAdmin] = React.useState(false);
	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userUpdate = useSelector((state) => state.userUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdate;

	React.useEffect(() => {
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET });
			history.push('/admin/userlist');
		} else {
			if (!user.name || user._id !== userId) {
				dispatch(getUserDetails(userId));
			} else {
				setName(user.name);
				setEmail(user.email);
				setIsAdmin(user.isAdmin);
			}
		}
	}, [user, dispatch, userId, successUpdate, history]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(updateUser({ name, email, isAdmin, _id: userId }));
	};

	return (
		<>
			<StyledLink to="/admin/userlist">
				<Button>Go Back</Button>
			</StyledLink>
			<FormContainer>
				<Typography className={classes.marginVer} variant="h5">
					EDIT USER
				</Typography>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant="error">{errorUpdate}</Message>}

				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="error">{error}</Message>
				) : (
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
						<div>
							<FormControlLabel
								control={
									<Checkbox
										checked={isAdmin}
										onChange={() => setIsAdmin(!isAdmin)}
										name="checkedA"
									/>
								}
								label="Is Admin"
							/>
						</div>

						<Button
							className={classes.marginVer}
							variant="contained"
							color="primary"
							type="submit"
						>
							Update
						</Button>
					</form>
				)}
			</FormContainer>
		</>
	);
};

export default UserEditScreen;
