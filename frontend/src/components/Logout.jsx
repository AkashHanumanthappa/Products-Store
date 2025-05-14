import React from "react";
import { Button } from "@chakra-ui/react";
import { useAuthStore } from "../store/user";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { user, logoutUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  if (!user) return null; // 👈 Don't show button if not logged in

  return (
    <Button colorScheme="red" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
