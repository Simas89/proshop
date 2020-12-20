import React from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';

function HideOnScroll({ children, window }) {
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		threshold: 100,
		disableHysteresis: true,
	});

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
}

export default HideOnScroll;
