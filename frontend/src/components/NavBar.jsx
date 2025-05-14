import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { Button, Container, Flex, HStack, Text, useColorMode, Box, Spinner } from '@chakra-ui/react';
import { FaRegPlusSquare } from "react-icons/fa";
import { useAuthStore } from '../store/user';
import { MdOutlineLightMode, MdLightMode } from "react-icons/md";
import LogoutButton from './Logout';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [user, setUser] = useState(null);  // User state to store the user info
  const [loading, setLoading] = useState(true);  // Loading state
  const navigate = useNavigate(); // Use navigate for redirection
  
  useEffect(() => {
    const token = localStorage.getItem('token'); // Get token from localStorage

    if (!token) {
      navigate('/login'); // Redirect to login if no token
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user/me', {
          headers: {
            Authorization: `Bearer ${token}`, // Use token for authorization
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user); // Set user state
        } else {
          localStorage.removeItem('token'); // Clear token if response is not OK
          navigate('/login'); // Redirect to login
        }
      } catch (error) {
        console.error('Failed to fetch user', error);
        navigate('/login'); // Handle errors and redirect to login
      } finally {
        setLoading(false); // Set loading to false once fetching is done
      }
    };

    fetchUser(); // Fetch user when component mounts
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage on logout
    navigate('/login'); // Redirect to login page
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />  {/* Display a spinner while loading */}
      </Box>
    );
  }

  console.log("Current user:", user); // Debug log to check user state

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="4xl"
          fontWeight="extrabold"
        >
          <Link to={"/"}>Product Store</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <FaRegPlusSquare fontSize={20} />
            </Button>
          </Link>

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? (
              <MdOutlineLightMode fontSize={24} />
            ) : (
              <MdLightMode fontSize={24} />
            )}
          </Button>

          {!user ? (
            // If user is not logged in, show login button
            <Link to={"/login"}>
              <Button>Login</Button>
            </Link>
          ) : (
            // If user is logged in, show dashboard and logout button
            <>
              <Link to={"/dashboard"}>
                <Button>Dashboard</Button>
              </Link>
              <LogoutButton onClick={handleLogout} />
            </>
          )}
        </HStack>
      </Flex>
    </Container>
  );
};

export default NavBar;


