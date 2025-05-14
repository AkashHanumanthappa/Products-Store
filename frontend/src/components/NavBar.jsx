import { Button, Container, Flex, HStack,Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { FaRegPlusSquare } from "react-icons/fa";
import { MdOutlineLightMode,MdLightMode } from "react-icons/md";
import { Link } from 'react-router-dom'

const NavBar = () => {
  const {colorMode,toggleColorMode } = useColorMode();

  return <Container maxW={"1140px"} px={4}>
    <Flex
    h={16}
    alignItems={"center"}
    justifyContent={'space-between'}
    flexDir={{
      base:"column",
      sm:"row"
    }}
    >
  <Text
  bgGradient='linear(to-l, #7928CA, #FF0080)'
  bgClip='text'
  fontSize='4xl'
  fontWeight='extrabold'
  >
      

      <Link to={"/"}>Product Store</Link>
  </Text>
      <HStack spacing={2} alignItems={"center"}>
      <Link to={"/create"}>
      <Button>
      <FaRegPlusSquare fontSize={ 20 }/>
      </Button>
      </Link>
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? <MdOutlineLightMode fontSize={24} /> : <MdLightMode fontSize={24} />  }
      </Button>
      <Button>
      <Link to={"/login"}>Login</Link>
      </Button>
      </HStack>

      

    </Flex>

  </Container>
}
export default NavBar