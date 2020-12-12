import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import { Step, useMediaQuery } from '@material-ui/core';
import StepLabel from '@material-ui/core/StepLabel';
import StyledLink from 'components/StyledLink';
import { useTheme } from '@material-ui/core/styles';

import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	div {
		background: none;
		/* margin: auto; */
	}
`;

const steps = [
	{ label: 'Sign In', link: '/login' },
	{ label: 'Shipping', link: '/shipping' },
	{ label: 'Payment', link: '/payment' },
	{ label: 'Place Order', link: '/placeorder' },
];

const CheckoutSteps = ({ activeStep }) => {
	const theme = useTheme();
	const isMedScreen = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Wrapper>
			<Stepper
				style={isMedScreen ? null : { width: '100%' }}
				activeStep={activeStep}
				orientation={isMedScreen ? 'vertical' : 'horizontal'}
			>
				{steps.map((el, index) => {
					return (
						<Step key={el.label}>
							<StepLabel>
								{activeStep > index ? (
									<StyledLink to={el.link}>{el.label}</StyledLink>
								) : (
									el.label
								)}
							</StepLabel>
						</Step>
					);
				})}
			</Stepper>
		</Wrapper>
	);
};

export default CheckoutSteps;
