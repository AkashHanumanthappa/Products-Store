import React, { useState, useEffect } from "react";
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
import { useParams, useNavigate } from "react-router-dom";
import { useProductStore } from "../store/product";

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const { products, updateProduct, fetchMyProducts } = useProductStore();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "", // base64 string or url
    description: "",
    category: "general",
  });

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch products if not loaded yet
  useEffect(() => {
    if (products.length === 0) {
      fetchMyProducts();
    } else {
      const prod = products.find((p) => p._id === productId);
      if (prod) {
        setFormData({
          name: prod.name || "",
          price: prod.price || "",
          image: prod.image || "",
          description: prod.description || "",
          category: prod.category || "general",
        });
        setLoading(false);
      }
    }
  }, [products, productId, fetchMyProducts]);

  // Show loading while fetching
  if (loading) return <Box>Loading...</Box>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Convert image file to base64 string
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
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
        image: reader.result,
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

    setUploading(true);

    const productData = {
      name: formData.name.trim(),
      price: Number(formData.price),
      image: formData.image,
      description: formData.description.trim(),
      category: formData.category,
    };

    const { success, message } = await updateProduct(productId, productData);

    setUploading(false);

    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });

    if (success) {
      navigate("/products"); // adjust path as needed
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} boxShadow="md" borderRadius="md">
      <Heading mb={6} textAlign="center">
        Update Product
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

        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

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
          Update Product
        </Button>
      </VStack>
    </Box>
  );
};

export default UpdateProduct;
