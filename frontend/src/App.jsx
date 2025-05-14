import React , { useEffect } from 'react';
import { Box,Button } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import  NavBar  from './components/NavBar';
import Register from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashBoard from './pages/Dashboard';
import { useAuthStore } from "./store/user";

function App() {
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    // Fetch user data on mount
    fetchUser();
  }, [fetchUser]);
  return (
    <>
    <Box minH={"100vh"}>
    <NavBar />
     <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/create" element={<CreatePage/>} />
      <Route path="/register" element={<Register/>}/>
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/dashboard' element={<DashBoard/>} />
      </Routes>
    </Box>
        <div>
      {user ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
    </>
  );
}

export default App;
