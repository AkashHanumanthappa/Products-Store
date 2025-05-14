import React, { useEffect } from 'react'
import { HiEmojiSad,HiOutlineEmojiSad } from "react-icons/hi";
import  { Container,VStack,Text, useColorMode,Box, SimpleGrid } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard'
import { useProductStore } from '../store/product';
import { useAuthStore } from '../store/user';

const DashBoard = () => {
  const { fetchProduct, products } = useProductStore();
  const {user} = useAuthStore();

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  console.log("products", products);
  console.log("user", user);
  const {colorMode,toggleColorMode } = useColorMode();
  return (<Container maxW='container.xl' py={12}>
    <VStack spacing={8}>
        <Text
          bgGradient='linear(to-l, #7928CA, #FF0080)'
          bgClip='text'
          fontSize='3xl'
          fontWeight='extrabold'
        >Current Products</Text>
        <SimpleGrid
          columns={{
            base: 1,
            md:2,
            lg:3
          }}
          spacing={10}
          w={"full"}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product}/>
            ))}
          </SimpleGrid>

        {products.length == 0 &&(        
          <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
        No Product found{"   "}
          <Box as="span" display="inline-flex" alignItems="center">
            {colorMode === "light" ? (
              <HiEmojiSad fontSize={24} />
            ) : (
              <HiOutlineEmojiSad fontSize={24} />
            )}
          </Box>
        <Link to={"/create"}>
          <Text as='span' color={'blue.500'} _hover={{ textDecoration:"underline"}}>
            Create a Product
          </Text>
        </Link>
        </Text>)}
    </VStack>
  </Container>)
}

export default DashBoard