import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  registerUser: async (newUser) => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      // If the response is not ok (e.g., 409 Conflict), handle it gracefully
      if (!res.ok) {
        const errorText = await res.text();  // Read the error response text
        let message = "";

        if (res.status === 409) {
          message = "User already exists with this email.";  // Custom error for 409 Conflict
        } else {
          message = errorText || `Error ${res.status}: Unable to register.`;
        }

        return { success: false, message: message };
      }

      // If registration is successful, store user data
      const data = await res.json();
      set({ user: data.user });
      return { success: true, message: "Registration successful!" };

    } catch (err) {
      // Handle any network errors gracefully
      return {
        success: false,
        message: `Network error: ${err.message}`,
      };
    }
  },
  
  loginUser: async (loginData) => {
    if (!loginData.email || !loginData.password) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        return {
          success: false,
          message: `Error ${res.status}: ${errorText}`,
        };
      }

      const data = await res.json();

      set({ user: data.user }); // Store user data
      return { success: true, message: "Login successful!" };
    } catch (err) {
      return {
        success: false,
        message: `Request failed: ${err.message}`,
      };
    }
  },
}));

