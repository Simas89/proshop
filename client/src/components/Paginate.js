import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import styled from 'styled-components';

const Wrapper = styled.div`
	margin-top: 16px;
	/* border: 1px solid red; */
	display: flex;
	justify-content: center;
`;

const Paginate = ({ pages, page: pageProp, isAdmin = false, keyword = '' }) => {
	const [page] = React.useState(pageProp);
	const history = useHistory();

	const handleClick = (e, value) => {
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
