import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import Contact from "./pages/contact/contact";
import Products from "./pages/products/products";
import Orders from "./pages/orders/orders";

function RoutesApp() {
	return (
		<Router>
			<Header />
			<Analytics />
			<MainRoutes />
			<Footer />
		</Router>
	);
}

function MainRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/product/:productID" element={<Products />} />
			<Route path="/profile" element={<Profile />}/>
			<Route path="/orders" element={<Orders />}/>
			<Route path="/contact" element={<Contact />}/>
		</Routes>
	);
}

export default RoutesApp;