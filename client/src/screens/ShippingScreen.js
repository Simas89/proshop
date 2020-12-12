import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormContainer from 'components/FormContainer';
import CheckoutSteps from 'components/CheckoutSteps';

import { saveShippingAddress } from '../actions/cartActions';

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

const ShippingScreen = ({ history }) => {
	const classes = useStyles();

	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [address, setAddress] = React.useState(shippingAddress.address);
	const [city, setCity] = React.useState(shippingAddress.city);
	const [postalCode, setPostalCode] = React.useState(
		shippingAddress.postalCode
	);
	const [country, setCountry] = React.useState(shippingAddress.country);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		history.push('/payment');
	};
	return (
		<FormContainer>
			<Typography variant="h5">SHIPPING</Typography>
			<CheckoutSteps activeStep={1} />
			<form onSubmit={submitHandler}>
				<TextField
					className={classes.marginVer}
					onChange={(e) => setAddress(e.target.value)}
					value={address || ''}
					style={{ width: '100%' }}
					variant="outlined"
					required
					type="text"
					id="address"
					label="Address"
				/>
				<TextField
					className={classes.marginVer}
					onChange={(e) => setCity(e.target.value)}
					value={city || ''}
					style={{ width: '100%' }}
					variant="outlined"
					required
					type="text"
					id="city"
					label="City"
				/>
				<TextField
					className={classes.marginVer}
					onChange={(e) => setPostalCode(e.target.value)}
					value={postalCode || ''}
					style={{ width: '100%' }}
					variant="outlined"
					required
					type="text"
					id="postalCode"
					label="Enter postal code"
				/>
				<TextField
					className={classes.marginVer}
					onChange={(e) => setCountry(e.target.value)}
					value={country || ''}
					style={{ width: '100%' }}
					variant="outlined"
					required
					type="text"
					id="country"
					label="Country"
				/>
				<Button
					className={classes.marginVer}
					variant="contained"
					color="primary"
					type="submit"
				>
					Continue
				</Button>
			</form>
		</FormContainer>
	);
};

export default ShippingScreen;
