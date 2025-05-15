import React from "react";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={10}
      h={10}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
      aria-label={label}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.a>
  );
};

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      mt={10}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={8}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
        <Text fontWeight={"bold"} fontSize={"lg"}>
          Akash
        </Text>
        <Stack direction={"row"} spacing={6}>
          <a href="/">Home</a>
          <a href="/create">Create</a>
          <a href="/products">Products</a>
          <a href="/login">Login</a>
        </Stack>
      </Container>

      <Box borderTopWidth={1} borderStyle={"solid"} borderColor={useColorModeValue("gray.200", "gray.700")}>
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>© {new Date().getFullYear()} Akash. All rights reserved</Text>
          <HStack spacing={6}>
            <SocialButton label={"GitHub"} href="https://github.com/">
              <FaGithub />
            </SocialButton>
            <SocialButton label={"LinkedIn"} href="https://linkedin.com/">
              <FaLinkedin />
            </SocialButton>
            <SocialButton label={"Twitter"} href="https://twitter.com/">
              <FaTwitter />
            </SocialButton>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
