import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import Loader from 'components/Loader';
import Message from 'components/Message';
import { listProductDetails, updateProduct } from '../actions/productActions';
import FormContainer from 'components/FormContainer';
import StyledLink from 'components/StyledLink';
import { PRODUCT_UPDATE_RESET } from 'constants/productConstants';
import Meta from 'components/Meta';

const useStyles = makeStyles({
	root: {
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
	marginVer: {
		margin: '10px 0',
	},
});

const ProductEditScreen = ({ match, history }) => {
	const classes = useStyles();
	const productId = match.params.id;

	const [name, setName] = React.useState('');
	const [price, setPrice] = React.useState(0);
	const [image, setImage] = React.useState('');
	const [brand, setBrand] = React.useState('');
	const [category, setCategory] = React.useState('');
	const [countInStock, setCountInStock] = React.useState(0);
	const [description, setDescription] = React.useState('');
	const [uploading, setUploading] = React.useState(false);

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const productUpdate = useSelector((state) => state.productUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = productUpdate;

	React.useEffect(() => {
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
			history.push('/admin/productlist');
		} else {
			if (!product.name || product._id !== productId) {
				dispatch(listProductDetails(productId));
			} else {
				setName(product.name);
				setPrice(product.price);
				setImage(product.image);
				setBrand(product.brand);
				setCategory(product.category);
				setCountInStock(product.countInStock);
				setDescription(product.description);
			}
		}
	}, [dispatch, history, productId, product, successUpdate]);

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		console.log(file);
		console.log(formData);

		formData.append('image', file);
		setUploading(true);

		try {
			const data = await axios.post('/api/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			console.log('data ', data.data);

			setImage(data.data);
			setUploading(false);
		} catch (error) {
			console.error(error);
			setUploading(false);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateProduct({
				_id: productId,
				name,
				price,
				image,
				brand,
				category,
				description,
				countInStock,
			})
		);
	};

	return (
		<>
			<Meta title={'DemoShop | Admin area'} />
			<StyledLink to="/admin/productlist">
				<Button>Go Back</Button>
			</StyledLink>
			<FormContainer>
				<Typography className={classes.marginVer} variant="h5">
					EDIT PRODUCT
				</Typography>
				{loadingUpdate && <Loader />}

				{errorUpdate && <Message variant="error">{errorUpdate}</Message>}

				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="error">{error}</Message>
				) : (
					<form onSubmit={submitHandler}>
						<TextField
							className={classes.marginVer}
							onChange={(e) => setName(e.target.value)}
							value={name}
							style={{ width: '100%' }}
							variant="outlined"
							type="text"
							id="name"
							label="name"
						/>
						<TextField
							className={classes.marginVer}
							onChange={(e) => setPrice(e.target.value)}
							value={price}
							style={{ width: '100%' }}
							variant="outlined"
							type="number"
							id="price"
							label="Price"
						/>
						<TextField
							className={classes.marginVer}
							onChange={(e) => setImage(e.target.value)}
							value={image}
							style={{ width: '100%' }}
							variant="outlined"
							type="text"
							id="image"
							label="Image"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<>
											<input
												style={{ display: 'none' }}
												accept="image/*"
												id="contained-button-file"
												multiple
												type="file"
												onChange={uploadFileHandler}
											/>
											<label htmlFor="contained-button-file">
												{!uploading ? (
													<Button
														variant="contained"
														component="span"
														color="secondary"
													>
														Upload
													</Button>
												) : (
													'Uploading...'
												)}
											</label>
											{loading && <Loader />}
										</>
									</InputAdornment>
								),
							}}
						/>

						<TextField
							className={classes.marginVer}
							onChange={(e) => setBrand(e.target.value)}
							value={brand}
							style={{ width: '100%' }}
							variant="outlined"
							type="text"
							id="brand"
							label="Brand"
						/>
						<TextField
							className={classes.marginVer}
							onChange={(e) => setCategory(e.target.value)}
							value={category}
							style={{ width: '100%' }}
							variant="outlined"
							type="text"
							id="category"
							label="Category"
						/>
						<TextField
							className={classes.marginVer}
							onChange={(e) => setCountInStock(e.target.value)}
							value={countInStock}
							style={{ width: '100%' }}
							variant="outlined"
							type="number"
							id="count-in-stock"
							label="Count in stock"
						/>
						<TextField
							className={classes.marginVer}
							onChange={(e) => setDescription(e.target.value)}
							value={description}
							style={{ width: '100%' }}
							variant="outlined"
							type="text"
							id="description"
							label="Description"
						/>

						<Button
							className={classes.marginVer}
							variant="contained"
							color="primary"
							type="submit"
						>
							Update
						</Button>
					</form>
				)}
			</FormContainer>
		</>
	);
};

export default ProductEditScreen;
