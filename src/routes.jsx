import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import Contact from "./pages/contacts/contact";
import Products from "./pages/products/products";

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
			<Route path="/contact" element={<Contact />}/>
		</Routes>
	);
}

export default RoutesApp;