import React from 'react';
import { Alert } from '@material-ui/lab';

const Message = ({ variant, children, style }) => {
	return (
		<Alert style={style} severity={variant}>
			{children}
		</Alert>
	);
};

Message.defaultProps = {
	variant: 'info',
};
export default Message;
