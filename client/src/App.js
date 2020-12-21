import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PX_TO_BOTTOM } from 'constants/systemConstants';
import styled from 'styled-components';
import { Container } from '@material-ui/core';
import Header from 'components/Header';
import Footer from 'components/Footer';
import HomeScreen from 'screens/HomeScreen';
import ProductScreen from 'screens/ProductScreen';
import CartScreen from 'screens/CartScreen';
import LoginScreen from 'screens/LoginScreen';
import RegisterScreen from 'screens/RegisterScreen';
import ProfileScreen from 'screens/ProfileScreen';
import ShippingScreen from 'screens/ShippingScreen';
import PaymentScreen from 'screens/PaymentScreen';
import PlaceOrderScreen from 'screens/PlaceOrderScreen';
import OrderScreen from 'screens/OrderScreen';
import UserListScreen from 'screens/UserListScreen';
import UserEditScreen from 'screens/UserEditScreen';
import ProductListScreen from 'screens/ProductListScreen';
import ProductEditScreen from 'screens/ProductEditScreen';
import OrderListScreen from 'screens/OrderListScreen';

import ExploreOurRange from 'components/ExploreOurRange';
import SideMenu from 'components/SideMenu';
import Demo from 'components/Demo';

import ScrollTop from 'components/ScrollTop';

const AppWrapper = styled.div`
	main {
		padding-top: ${(p) => p.theme.spacing(12)}px;
		min-height: 100vh;
		/* border: 1px solid red; */
	}
`;

const App = () => {
	const dispatch = useDispatch();
	const ref = React.useRef(null);
	React.useEffect(() => {
		const updatePxToBottom = () => {
			dispatch({
				type: PX_TO_BOTTOM,
				payload:
					ref.current.getBoundingClientRect().bottom - window.innerHeight,
			});
		};
		document.addEventListener('scroll', updatePxToBottom);
		return () => window.removeEventListener('scroll', updatePxToBottom);
	}, [dispatch]);
	return (
		<Router>
			<AppWrapper ref={ref}>
				<Header />
				<SideMenu />
				<ScrollTop />

				<main id="back-to-top-anchor">
					<Route path="/" exact component={Demo} />
					<Container style={{ paddingTop: '20px' }}>
						<Route path="/login" component={LoginScreen} />
						<Route path="/order/:id" component={OrderScreen} />
						<Route path="/placeorder" component={PlaceOrderScreen} />
						<Route path="/payment" component={PaymentScreen} />
						<Route path="/shipping" component={ShippingScreen} />
						<Route path="/register" component={RegisterScreen} />
						<Route path="/profile" component={ProfileScreen} />
						<Route path="/product/:id" component={ProductScreen} />
						<Route path="/cart/:id?" component={CartScreen} />
						<Route path="/admin/userlist" component={UserListScreen} />
						<Route
							path="/admin/user/:id/edit"
							component={UserEditScreen}
						/>
						<Route
							path="/admin/productlist"
							component={ProductListScreen}
							exact
						/>
						<Route
							path="/admin/productlist/:pageNumber"
							component={ProductListScreen}
							exact
						/>
						<Route path="/admin/orderlist" component={OrderListScreen} />
						<Route
							path="/admin/product/:id/edit"
							component={ProductEditScreen}
						/>

						<Route path="/search/:keyword" component={HomeScreen} exact />
						<Route
							path="/page/:pageNumber"
							exact
							component={HomeScreen}
						/>
						<Route
							path="/category/:category"
							exact
							component={HomeScreen}
						/>
						<Route
							path="/search/:keyword/page/:pageNumber"
							exact
							component={HomeScreen}
						/>
						<Route
							path="/category/:category/page/:pageNumber"
							exact
							component={HomeScreen}
						/>
						<Route path="/" exact component={HomeScreen} />
						<Route path="/" component={ExploreOurRange} exact />
					</Container>
				</main>
				<Footer />
			</AppWrapper>
		</Router>
	);
};

export default App;
