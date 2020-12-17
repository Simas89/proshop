import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import styled from 'styled-components';
import { useHistory, Route } from 'react-router-dom';

const Wrapper = styled.div`
	border: 1px solid white;
	display: flex;
	/* justify-content: center; */
	align-items: center;
	flex-grow: 1;
	max-width: 300px;
	padding-left: 20px;

	.icon {
	}

	.input-base {
		padding: 4px 4px 4px 16px;
		color: white;
	}
`;

const SearchBox = () => {
	const history = useHistory();
	const [keyword, setKeyword] = React.useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
		} else {
			history.push('/');
		}
	};
	return (
		<Wrapper>
			<SearchIcon className="icon" />
			<form onSubmit={submitHandler}>
				<InputBase
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
					className="input-base"
					placeholder="Search Products…"
					inputProps={{ 'aria-label': 'search' }}
				/>
			</form>
		</Wrapper>
	);
};

export default SearchBox;
