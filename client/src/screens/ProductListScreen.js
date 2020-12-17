import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, Box } from '@material-ui/core';
import Loader from 'components/Loader';
import Message from 'components/Message';
import {
	listProducts,
	deleteProduct,
	createProduct,
} from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from 'constants/productConstants';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

import ButtonGroup from '@material-ui/core/ButtonGroup';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Paginate from 'components/Paginate';

const ProductListScreen = ({ history, match }) => {
	const pageNumber = match.params.pageNumber || 1;

	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, page, pages } = productList;

	const productDelete = useSelector((state) => state.productDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = productDelete;

	const productCreate = useSelector((state) => state.productCreate);
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		product: createdProduct,
	} = productCreate;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	React.useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET });

		if (!userInfo.isAdmin) {
			history.push('/login');
		}

		if (successCreate) {
			history.push(`/admin/product/${createdProduct._id}/edit`);
		} else {
			dispatch(listProducts('', pageNumber));
		}
	}, [
		dispatch,
		userInfo,
		history,
		successDelete,
		successCreate,
		createdProduct,
		pageNumber,
	]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteProduct(id));
		}
	};
	const editHandler = (id) => {
		history.push(`/admin/product/${id}/edit`);
	};
	const createProductHandler = () => {
		dispatch(createProduct());
	};
	return (
		<>
			<Box display="flex" justifyContent="space-between" margin="20px 0">
				<Typography variant="h5">PRODUCTS</Typography>

				<Button
					onClick={createProductHandler}
					startIcon={<AddIcon />}
					variant="outlined"
				>
					Create Product
				</Button>
			</Box>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant="error">{errorDelete}</Message>}
			{loadingCreate && <Loader />}
			{errorCreate && <Message variant="error">{errorCreate}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="error">{error}</Message>
			) : (
				<>
					<TableContainer component={Paper}>
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>ID</TableCell>
									<TableCell>NAME</TableCell>
									<TableCell>PRICE</TableCell>
									<TableCell>CATEGORY</TableCell>
									<TableCell>BRAND</TableCell>
									<TableCell></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{products &&
									products.map((product) => (
										<TableRow key={product._id}>
											<TableCell component="th" scope="row">
												{product._id}
											</TableCell>
											<TableCell>{product.name}</TableCell>
											<TableCell>{product.price}</TableCell>
											<TableCell>{product.category}</TableCell>
											<TableCell>{product.brand}</TableCell>
											<TableCell>
												<ButtonGroup>
													<Button
														onClick={() =>
															editHandler(product._id)
														}
													>
														<EditIcon />
													</Button>

													<Button
														onClick={() =>
															deleteHandler(product._id)
														}
													>
														<DeleteIcon
															style={{ color: 'red' }}
														/>
													</Button>
												</ButtonGroup>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
					<Paginate pages={pages} page={page} isAdmin={true} />
				</>
			)}
		</>
	);
};

export default ProductListScreen;
