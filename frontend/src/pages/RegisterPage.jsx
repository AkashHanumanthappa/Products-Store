// src/components/Register.js
import React, { useState } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, VStack, useToast
} from '@chakra-ui/react';
import axios from '../utils/axios';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/register', formData);
      toast({ title: 'Registered Successfully', status: 'success', duration: 3000, isClosable: true });
      console.log(res.data);
    } catch (err) {
      toast({ title: 'Registration Failed', description: err.response?.data?.message, status: 'error', duration: 3000, isClosable: true });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={5} boxShadow="md" borderRadius="lg">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input name="name" onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email" onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input name="password" type="password" onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input name="confirmPassword" type="password" onChange={handleChange} />
          </FormControl>
          <Button type="submit" colorScheme="teal" width="full">Register</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Register;
