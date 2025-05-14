
import { Box,Button } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import  NavBar  from './components/NavBar';
import Register from './pages/RegisterPage';
import Login from './pages/LoginPage';

function App() {
  console.log("App is rendering");
  return (
    <>
    <Box minH={"100vh"}>
    <NavBar />
     <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/create" element={<CreatePage/>} />
      <Route path="/register" element={<Register/>}/>
      <Route path='/login' element={<Login/>} />
      </Routes>
    </Box>
    </>
  );
}

export default App;
