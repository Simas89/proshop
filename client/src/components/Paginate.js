import React from 'react';
import { useHistory } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import styled from 'styled-components';

const Wrapper = styled.div`
	margin-top: 16px;
	/* border: 1px solid red; */
	display: flex;
	justify-content: center;
`;

const Paginate = ({
	pages,
	page: pageProp,
	isAdmin = false,
	keyword = '',
	category = '',
}) => {
	const [page] = React.useState(pageProp);
	const history = useHistory();

	const handleClick = (e, value) => {
		if (category) {
			history.push(`/category/${category}/page/${value}`);
		} else
			history.push(
				!isAdmin
					? keyword
						? `/search/${keyword}/page/${value}`
						: `/page/${value}`
					: `/admin/productlist/${value}`
			);
	};
	return (
		pages > 1 && (
			<Wrapper>
				<Pagination
					onChange={handleClick}
					page={page}
					count={pages}
					color="primary"
				/>
			</Wrapper>
		)
	);
};

export default Paginate;
