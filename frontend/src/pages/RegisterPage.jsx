import React, { useState } from "react";
import axios from "axios";
import {Box,Button,FormControl,FormLabel, Input,VStack,Heading } from "@chakra-ui/react";
import { useAuthStore } from '../store/user.js';
import { useToast } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [formData, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toast = useToast();
  const { registerUser } = useAuthStore();
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
  if (formData.password !== formData.confirmPassword) {
    toast({
      title: "Error",
      description: "Passwords do not match.",
      status: "error",
      duration: 500,
      isClosable: true,
    });
    return;
  }

  const { success, message } = await registerUser(formData);

  if (!success && message.includes("already exists")) {
    toast({
      title: "User already exists",
      description: "An account with this email is already registered.",
      status: "warning",
      duration: 500,
      isClosable: true,
    });
  } else {
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 500,
      isClosable: true,
    });
  }

  if (success) {
    setNewUser({
      name: "",
      email: "",
      password: "",
      confirmPassword: "", 
    },navigate("/")
  );
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} boxShadow="md" borderRadius="md">
      <Heading mb={6} textAlign="center">
        Register
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              name="name"
              placeholder="Enter username"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </FormControl>

          <Button colorScheme="teal" type="submit" width="full">
            Register
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Register;