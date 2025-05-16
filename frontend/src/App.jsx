import React from "react"; // ✅ Add this
import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Login from "./pages/Login"
import Register from "./pages/Register"
import MyProductsPage from "./components/Products"
import UpdateProduct from "./pages/updatePage";
import InquirePage from "./pages/InquirePage";
import Footer from "./components/Footer";
import RouterFix from "./utils/RouterFix";
function App() {
	return (
		<Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
			<NavBar />
		    <RouterFix /> 
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/create' element={<CreatePage />} />
				<Route path='/login' element={<Login />} />
				<Route path="/register" element={<Register/>}/>
				<Route path="/products" element={<MyProductsPage/>} />
				<Route path="/edit/:productId" element={<UpdateProduct />} />
				<Route path="/inquire/:id" element={<InquirePage />} />
			</Routes>
			 <Footer />
		</Box>
	);
}

export default App;

