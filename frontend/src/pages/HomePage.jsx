import React, { useEffect, useState } from 'react';
import { HiEmojiSad, HiOutlineEmojiSad } from "react-icons/hi";
import { Container, VStack, Text, Box, SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProductStore } from '../store/product';
import { useAuthStore } from '../store/user';

const HomePage = () => {
  const { fetchProduct, products } = useProductStore();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true); // Loading state

useEffect(() => {
  console.log("Current products state:", products); // Log the products from Zustand state
}, [products]);

  console.log("products", products); // Check if products have been fetched
  console.log("user", user); // Check the user state

  // Handle loading, empty product state, and rendering
  if (isLoading) {
    return <Text>Loading products...</Text>; // Show loading text while fetching data
  }

  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <Text
          bgGradient='linear(to-l, #7928CA, #FF0080)'
          bgClip='text'
          fontSize='3xl'
          fontWeight='extrabold'
        >
          Current Products
        </Text>
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3
          }}
          spacing={10}
          w={"full"}
        >
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
              No products found.{" "}
              <Link to={"/create"}>
                <Text as='span' color={'blue.500'} _hover={{ textDecoration: "underline" }}>
                  Create a Product
                </Text>
              </Link>
            </Text>
          )}
        </SimpleGrid>
      </VStack>
    </Container>
  );
}

export default HomePage;
