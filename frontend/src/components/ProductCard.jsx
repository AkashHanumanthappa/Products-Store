import {
  Box,
  Text,
  Heading,
  HStack,
  IconButton,
  Image,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  VStack,
  ModalBody,
  Input,
  useDisclosure,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useProductStore } from "../store/product";
import { useAuthStore } from "../store/user";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const user = useAuthStore((state) => state.user); // ✅ Get current user

  const isOwner = user && product.createdBy === user._id; // ✅ Check ownership

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdatedProduct = async (pid, updatedProduct) => {
    const result = await updateProduct(pid, updatedProduct);
    if (result.success) {
      toast({
        title: "Product updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } else {
      toast({
        title: "Update failed",
        description: result.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
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
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          {isOwner ? (
            <>
              <IconButton
                icon={<FaEdit />}
                onClick={onOpen}
                colorScheme="blue"
                aria-label="Edit Product"
              />
              <IconButton
                icon={<MdOutlineDeleteForever />}
                onClick={() => handleDeleteProduct(product._id)}
                colorScheme="red"
                aria-label="Delete Product"
              />
            </>
          ) : (
            <Button colorScheme="green" w="full">
              Buy
            </Button>
          )}
        </HStack>
      </Box>

      {/* Modal for Editing Product */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
              <Input
                placeholder="Price"
                type="text"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
              />
              <Input
                placeholder="Image URL"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct((prev) => ({
                    ...prev,
                    image: e.target.value,
                  }))
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() =>
                handleUpdatedProduct(product._id, updatedProduct)
              }
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
