import { Box,Text,Heading,HStack,IconButton,Image, useColorModeValue, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, VStack, ModalBody, Input,useDisclosure, Button, ModalFooter} from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdOutlineDeleteForever } from "react-icons/md"
import { FaEdit } from "react-icons/fa";
import { useProductStore } from '../store/product';

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const {deleteProduct,updateProduct}= useProductStore();
    const toast =useToast()

    const handleDeleteProduct = async (pid) => {
        const {success,message}= await deleteProduct(pid)
        if(!success){
            toast({
                title:'Error',
                description:message,
                status:'error',
                duration:3000,
                isClosable:true,
            })
        }else{
            toast({
                title:'Success',
                description:message,
                status:'success',
                duration:3000,
                isClosable:true,
            })
        }
    }

    const handleUpdatedProduct = async(pid, updatedProduct) => {
     const result= await updateProduct(pid,updatedProduct)
      onClose();
      if (result.success) {
        toast({
          title: "Product updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      onClose();
      }
       else {
      toast({
        title: "Update failed",
        description: result.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    }
    return (
      <Box
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        bg={bg}
      >
        <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />
        <Box p={4}>
          <Heading as="h3" size="md" mb={2}>
            {product.name}
          </Heading>
          <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
            ${product.price}
          </Text>
          <HStack spacing={2}>
            <IconButton icon={<FaEdit />} onClick={onOpen}   colorScheme="blue" />
            <IconButton icon={<MdOutlineDeleteForever />} onClick={() => handleDeleteProduct(product._id)} colorScheme="red" />
          </HStack>
        </Box>
        <Modal isOpen={isOpen}  onClose={onClose}>
            <ModalOverlay/>
              <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton/>
                    <ModalBody>
                    <VStack>
                    <Input
                      placeholder="Product Name"
                      name="name"
                      value={updatedProduct?.name || ""}
                      onChange={(e) =>
                        setUpdatedProduct((prev) => ({ ...prev, name: e.target.value }))
                      }
                    />

                    <Input
                      placeholder="Price"
                      name="number"
                      type="text"
                      value={updatedProduct?.price || ""}
                      onChange={(e) =>
                        setUpdatedProduct((prev) => ({ ...prev, price: e.target.value }))
                      }
                    />

                    <Input
                      placeholder="Image URL"
                      name="image"
                      value={updatedProduct?.image || ""}
                      onChange={(e) =>
                        setUpdatedProduct((prev) => ({ ...prev, image: e.target.value }))
                      }
                    />
                    </VStack>
                    </ModalBody>
                  <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => handleUpdatedProduct(product._id,updatedProduct)}>Update</Button>
                    <Button variant={'ghost'} onClick={onClose} mr={3}>Cancel</Button>
                    </ModalFooter>
              </ModalContent>
        </Modal>
      </Box>
    );
  };
export default ProductCard