import { useEffect, useRef, useState } from "react";
import { useProductStore } from "../store/product";
import {
  Container,
  VStack,
  Text,
  SimpleGrid,
  Button,
  HStack,
  Box,
  useToast,
} from "@chakra-ui/react";
import ProductCard from "../components/Myproduct";
import { useNavigate } from "react-router-dom";

function MyProductsPage() {
  const { products, fetchMyProducts, deleteProduct } = useProductStore();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    fetchMyProducts();
  }, [fetchMyProducts]);

  const handleEdit = (product_id) => {
    navigate(`/edit/${product_id}`);
  };

  const handleDelete = async (productId) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    const result = await deleteProduct(productId);

    toast({
      title: result.success ? "Deleted!" : "Error",
      description: result.message,
      status: result.success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, teal.400, green.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          My Products 📦
        </Text>

        {products.length === 0 ? (
          <Text fontSize="xl" color="gray.500" textAlign="center" fontWeight="bold">
            No products created yet 😕
          </Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
            {products.map((product) => (
              <Box key={product._id}>
                <ProductCard product={product} />
                <HStack justifyContent="center" mt={2}>
                  <Button colorScheme="blue" onClick={() => handleEdit(product._id)}>
                    Edit
                  </Button>
                  <Button colorScheme="red" onClick={() => handleDelete(product._id)}>
                    Delete
                  </Button>
                </HStack>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
}

export default MyProductsPage;

