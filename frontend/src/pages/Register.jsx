import React, { useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
  useToast,
  Text,
  Image,
  Spinner,
} from '@chakra-ui/react';
import { useAuthStore } from '../store/user';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profilePic: '',
  });

  const [loading, setLoading] = useState(false);
  const registerUser = useAuthStore((state) => state.registerUser);
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 1 * 1024 * 1024; // 1MB

    if (file && file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Profile picture must be less than 1MB.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill all required fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: 'Weak Password',
        description: 'Password must be at least 6 characters.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    const { success, message, data } = await registerUser(formData);
    setLoading(false);

    toast({
      title: success ? 'Success' : 'Error',
      description: message,
      status: success ? 'success' : 'error',
      duration: 3000,
      isClosable: true,
    });

    if (success) {
      navigate('/login');
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt={10} p={5} shadow="md" borderWidth="1px" rounded="md">
      <Heading mb={6} textAlign="center">Register</Heading>
      <VStack spacing={4}>
        <Text fontWeight="semibold">Choose your profile pic</Text>

        {formData.profilePic && (
          <Image
            src={formData.profilePic}
            alt="Profile Preview"
            boxSize="100px"
            objectFit="cover"
            borderRadius="md"
          />
        )}

        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          p={1}
        />

        <Input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
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

        <Button
          colorScheme="teal"
          width="full"
          onClick={handleRegister}
          isDisabled={loading}
        >
          {loading ? <Spinner size="sm" mr={2} /> : 'Register'}
        </Button>
      </VStack>
    </Box>
  );
};

export default Register;
