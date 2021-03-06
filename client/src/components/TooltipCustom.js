import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Tooltip, Typography } from '@material-ui/core';

import styled from 'styled-components';

const HtmlTooltip = withStyles((theme) => ({
	tooltip: {
		marginTop: '16px',
		backgroundColor: '#f5f5f9',
		// backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		maxWidth: 220,
		fontSize: theme.typography.pxToRem(12),
		border: '1px solid #dadde9',
	},
	arrow: {
		color: '#f5f5f9',
	},
}))(Tooltip);

const Contents = styled.div`
	display: flex;
	flex-direction: column;

	.MuiButton-root {
		text-transform: none; /*For Lower case use lowercase*/
	}
`;

const TooltipCustom = ({ children, items }) => {
	const [isOpen, setIsOpen] = React.useState(false);
	return (
		<HtmlTooltip
			interactive={true}
			arrow={true}
			open={isOpen}
			onClose={() => setIsOpen(false)}
			onOpen={() => setIsOpen(true)}
			title={
				<Contents
					onMouseLeave={() => setIsOpen(false)}
					onClick={() => setIsOpen(false)}
				>
					{items}
				</Contents>
			}
		>
			{children}
		</HtmlTooltip>
	);
};

export default TooltipCustom;
