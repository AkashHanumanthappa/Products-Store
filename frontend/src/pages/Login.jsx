import React, { useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
  useToast,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/user';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const loginUser = useAuthStore((state) => state.loginUser);
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      toast({
        title: 'Missing Fields',
        description: 'Please enter email and password.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const { success, message } = await loginUser(formData);

    toast({
      title: success ? 'Success' : 'Error',
      description: message,
      status: success ? 'success' : 'error',
      duration: 3000,
      isClosable: true,
    });

    if (success) {
      navigate('/');
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt={10} p={5} shadow="md" borderWidth="1px" rounded="md">
      <Heading mb={6} textAlign="center">Login</Heading>
      <VStack spacing={4}>
        <Input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button colorScheme="blue" width="full" onClick={handleLogin}>
          Login
        </Button>
        <Text fontSize="sm" color="gray.500">
          Don't have an account? <a href="/register" style={{ color: 'teal' }}>Register</a>
        </Text>
      </VStack>
    </Box>
  );
};

export default Login;
