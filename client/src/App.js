import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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

const AppWrapper = styled.div`
	main {
		padding: ${(p) => p.theme.spacing(2)}px 0;
		min-height: 80vh;
	}
`;

const App = () => {
	return (
		<Router>
			<AppWrapper>
				<Header />
				<main>
					<Container>
						<Route path="/login" component={LoginScreen} />
						<Route path="/register" component={RegisterScreen} />
						<Route path="/profile" component={ProfileScreen} />
						<Route path="/product/:id" component={ProductScreen} />
						<Route path="/cart/:id?" component={CartScreen} />
						<Route path="/" exact component={HomeScreen} />
					</Container>
				</main>
				<Footer />
			</AppWrapper>
		</Router>
	);
};

export default App;
