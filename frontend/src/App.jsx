import React from "react"; // ✅ Add this
import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Login from "./pages/Login"
import Register from "./pages/Register"
import MyProductsPage from "./components/Products"

function App() {
	return (
		<Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
			<NavBar />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/create' element={<CreatePage />} />
				<Route path='/login' element={<Login />} />
				<Route path="/register" element={<Register/>}/>
				<Route path="/products" element={<MyProductsPage/>} />
			</Routes>
		</Box>
	);
}

export default App;

