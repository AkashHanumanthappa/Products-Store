import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Box, Heading, Text, Image, Spinner } from "@chakra-ui/react";
import { useProductStore } from "../store/product";

const InquirePage = () => {
  const { id } = useParams(); // product id from URL
  const { fetchProducts, products } = useProductStore();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      // If products are empty, fetch them
      if (products.length === 0) {
        await fetchProducts();
      }
      const found = products.find((p) => p._id === id);
      setProduct(found);
      setLoading(false);
    }

    loadProduct();
  }, [fetchProducts, id, products]);

  if (loading) {
    return (
      <Container centerContent py={20}>
        <Spinner size="xl" />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container py={20}>
        <Text fontSize="xl" color="red.500">
          Product not found.
        </Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={10}>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={6} bg="white" shadow="md">
        <Image src={product.image} alt={product.name} borderRadius="md" mb={4} />
        <Heading mb={2}>{product.name}</Heading>
        <Text fontSize="xl" fontWeight="bold" mb={2}>
          ${product.price}
        </Text>
        <Text mb={4}>{product.description || "No description available."}</Text>
        <Text fontWeight="semibold">Category: {product.category || "Uncategorized"}</Text>
      </Box>
    </Container>
  );
};

export default InquirePage;
