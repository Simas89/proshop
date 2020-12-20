import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useScrollTrigger, Zoom, Fab } from '@material-ui/core';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import styled from 'styled-components';

const Wrapper = styled.div`
	z-index: 100;
	position: fixed;
	bottom: ${(p) => p.theme.spacing(4)}px;
	right: ${(p) => p.theme.spacing(4)}px;
	/* border: 1px solid red; */
`;

function ScrollTop() {
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 500,
	});
	// const pxToBottom = useSelector((state) => state.core.pxToBottom);
	const pxToBottom = 300;

	let shift = pxToBottom - 150;
	let bottomShift = 0;
	if (shift <= 0) {
		// console.log(shift);
		bottomShift = Math.abs(shift);
	}

	// console.log(pxToBottom - 70);

	const handleClick = () => {
		const anchor = document.querySelector('#back-to-top-anchor');
		if (anchor) {
			anchor.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const shiftAnim = useSpring({
		from: { transform: 'translateY(0px)' },
		to: { transform: `translateY(-${bottomShift}px)` },
		config: {
			tension: 510,
			friction: 100,
			mass: 10,
		},
	});

	return (
		<Zoom in={trigger}>
			<Wrapper>
				<animated.div style={shiftAnim} onClick={handleClick}>
					<Fab color="primary">
						<KeyboardArrowUpOutlinedIcon />
					</Fab>
				</animated.div>
			</Wrapper>
		</Zoom>
	);
}

export default ScrollTop;
