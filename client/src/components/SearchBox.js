import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Wrapper = styled.div`
	border: 1px solid white;
	display: flex;
	/* justify-content: center; */
	align-items: center;
	flex-grow: 1;
	max-width: 500px;
	padding-right: 20px;
	form {
		/* border: 1px solid red; */
		width: 100%;
		.input-base {
			padding: 4px 4px 4px 16px;
			color: white;
			width: 100%;
		}
	}

	.icon {
		opacity: ${(p) => (p.opacity ? 1 : 0.5)};
		transition: 0.3s;
		&:hover {
			cursor: ${(p) => (p.opacity ? 'pointer' : 'default')};
		}
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
		<Wrapper opacity={keyword}>
			<form onSubmit={submitHandler}>
				<InputBase
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
					className="input-base"
					placeholder="Search Products…"
					inputProps={{ 'aria-label': 'search' }}
				/>
			</form>
			<SearchIcon className="icon" onClick={submitHandler} />
		</Wrapper>
	);
};

export default SearchBox;
