import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormContainer from 'components/FormContainer';
import CheckoutSteps from 'components/CheckoutSteps';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { savePaymentMethod } from '../actions/cartActions';

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

const PaymentScreen = ({ history }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	if (!shippingAddress) {
		history.push('/shipping');
	}

	const [paymentMethod, setPaymentMethod] = React.useState('PayPal');

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod({ paymentMethod }));
		history.push('/placeorder');
	};

	const handleChange = (event) => {
		setPaymentMethod(event.target.value);
	};
	return (
		<FormContainer>
			<Typography variant="h5">PAYMENT METHOD</Typography>
			<CheckoutSteps activeStep={2} />
			<form onSubmit={submitHandler}>
				<Grid container>
					<Grid>
						{' '}
						<FormControl component="fieldset">
							<FormLabel component="legend">Select Method</FormLabel>
							<RadioGroup
								aria-label="gender"
								name="gender1"
								value={paymentMethod}
								onChange={handleChange}
							>
								<FormControlLabel
									value="PayPal"
									control={<Radio />}
									label="PayPal or Credit Card"
								/>
								<FormControlLabel
									value="Stripe"
									control={<Radio />}
									label="Stripe"
									disabled
								/>
							</RadioGroup>
						</FormControl>
					</Grid>
				</Grid>
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

export default PaymentScreen;
