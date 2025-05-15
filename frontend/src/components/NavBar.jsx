import React from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  useDisclosure,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useAuthStore } from "../store/user"; 
import Login from "../pages/Login";// adjust path

const Links = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Add Products", href: "/create" },
];

const NavLink = ({ href, children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{ textDecoration: "none", bg: "gray.200" }}
    href={href}
  >
    {children}
  </Link>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useAuthStore((state) => state.user);
  const logoutUser = useAuthStore((state) => state.logoutUser);

  return (
    <Box bg="teal.500" px={4} color="white">
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
          bg="teal.400"
          _hover={{ bg: "teal.600" }}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Box fontWeight="bold" fontSize="lg">
            MyStore
          </Box>
          <HStack
            as={"nav"}
            spacing={4}
            display={{ base: "none", md: "flex" }}
            fontWeight="medium"
          >
            {Links.map(({ label, href }) => (
              <NavLink key={label} href={href}>
                {label}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          {user ? (
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"md"}
                  src={user.profilePic || ""}
                  name={user.username || "User"}
                />
              </MenuButton>
              <MenuList color="black">
                <MenuItem>{user.username}</MenuItem>
                <MenuItem onClick={logoutUser}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <HStack spacing={4}>
              <Button
                variant={"solid"}
                colorScheme={"teal"}
                size={"sm"}
                as="a"
                href="/login"
				element={<Login />}
              >
                Login
              </Button>
              <Button
                variant={"outline"}
                colorScheme={"teal"}
                size={"sm"}
                as="a"
                href="/register"
              >
                Register
              </Button>
            </HStack>
          )}
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map(({ label, href }) => (
              <NavLink key={label} href={href}>
                {label}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

