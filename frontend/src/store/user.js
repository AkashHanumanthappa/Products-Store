import { create } from "zustand";

const API_URL = import.meta.env.PROD 
  ? 'https://products-store-akash-h.onrender.com/api'
  : '/api';

export const useAuthStore = create((set) => {
  // Load user from localStorage safely on store initialization
  let savedUser = null;
  try {
    const userData = localStorage.getItem("user");
    if (userData) {
      savedUser = JSON.parse(userData);
    }
  } catch (e) {
    console.error("Failed to parse saved user from localStorage:", e);
    localStorage.removeItem("user");
  }

  return {
    user: savedUser, // Initial user state from localStorage (if available)

    setUser: (user) => {
      set({ user });
      localStorage.setItem("user", JSON.stringify(user));
    },

    registerUser: async ({ username, email, password }) => {
      if (!username || !email || !password) {
        return { success: false, message: "All fields are required" };
      }

      try {
        const res = await fetch(`${API_URL}/users/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await res.json();

        if (!data.success) {
          return { success: false, message: data.message || "Registration failed" };
        }

        return { success: true, message: data.message, data: data.user };
      } catch (error) {
        console.error("Register Error:", error);
        return { success: false, message: "Network error: " + error.message };
      }
    },

    loginUser: async (loginData) => {
      if (!loginData.email || !loginData.password) {
        return { success: false, message: "Please fill in all required fields." };
      }

      try {
        const res = await fetch(`${API_URL}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        const data = await res.json();

        if (!data.success) {
          return { success: false, message: data.message || "Login failed." };
        }

        // backend returns token and user inside data.data.user
        set({ user: data.data.user });
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        
        console.log("Login response:", data);

        return { success: true, message: "Login successful!" };
      } catch (err) {
        return {
          success: false,
          message: `Request failed: ${err.message}`,
        };
      }
    },

    logoutUser: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      set({ user: null });
    },

    isLoggedIn: () => {
      const state = useAuthStore.getState();
      return !!state.user;
    },

    fetchUser: async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch user");
        }

        set({ user: data.data });
        localStorage.setItem("user", JSON.stringify(data.data));
      } catch (err) {
        console.warn("Failed to fetch user from /api/auth/me:", err.message);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        set({ user: null });
      }
    },
  };
});