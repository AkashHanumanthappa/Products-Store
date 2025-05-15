import React from "react";
import { Box, Text, Heading, Button, Image, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const navigate = useNavigate();

  const handleBuyClick = (productId) => {
    navigate(`/inquire/${productId}`);
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Button colorScheme="green" w="full" onClick={() => handleBuyClick(product._id)}>
          Inquire
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCard;

