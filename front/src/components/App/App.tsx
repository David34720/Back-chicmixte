// src/App.jsx
import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "../Login/Login";
import HomePage from "../HomePage/HomePage";
import ProductManagement from "../ProductManagement/ProductManagement";
import CategoryManagement from "../CategoryManagement/CategoryManagement";
import AttributeManagement from "../AttributeManagement/AttributeManagement";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/home" element={<HomePage />} />
				<Route path="/products" element={<ProductManagement />} />
				<Route path="/categories" element={<CategoryManagement />} />
				<Route path="/attributes" element={<AttributeManagement />} />
				<Route path="/" element={<Login />} /> {/* Page par défaut */}
			</Routes>
		</Router>
	);
}

export default App;
