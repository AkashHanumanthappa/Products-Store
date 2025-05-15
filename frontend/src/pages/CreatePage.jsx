import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
  Textarea,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";

const CreateProduct = () => {
  const toast = useToast();
  const createProduct = useProductStore((state) => state.createProduct);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "", // will hold base64 string
    description: "",
    category: "general",
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Convert selected image file to base64 string
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      toast({
        title: "File too large",
        description: "Image size exceeds 2MB.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result, // base64 string
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (isNaN(formData.price) || Number(formData.price) <= 0) {
      toast({
        title: "Invalid Price",
        description: "Please enter a valid positive number for price.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!formData.image) {
      toast({
        title: "No Image",
        description: "Please upload an image file.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const productData = {
      name: formData.name.trim(),
      price: Number(formData.price),
      image: formData.image, // base64 string
      description: formData.description.trim(),
      category: formData.category,
    };

    const { success, message } = await createProduct(productData);

    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });

    if (success) {
      setFormData({
        name: "",
        price: "",
        image: "",
        description: "",
        category: "general",
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} boxShadow="md" borderRadius="md">
      <Heading mb={6} textAlign="center">
        Create Product
      </Heading>
      <VStack spacing={4}>
        <Input
          placeholder="Product Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          isRequired
        />
        <Input
          placeholder="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          type="number"
          min="0"
          step="0.01"
          isRequired
        />

        {/* File input for image upload */}
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          isRequired={!formData.image}
        />
        {/* Optional: preview the uploaded image */}
        {formData.image && (
          <Box boxSize="150px" mt={2}>
            <img
              src={formData.image}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "150px", objectFit: "contain" }}
            />
          </Box>
        )}

        <Textarea
          placeholder="Description (optional)"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <Select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="general">General</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="books">Books</option>
          <option value="other">Other</option>
        </Select>

        <Button
          colorScheme="teal"
          width="full"
          onClick={handleSubmit}
          isDisabled={!formData.name || !formData.price || !formData.image}
          isLoading={uploading}
        >
          Create Product
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateProduct;
