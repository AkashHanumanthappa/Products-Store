import { create } from "zustand";

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

        if (!res.ok) {
          const errorText = await res.text();
          let message = "";

          if (res.status === 409) {
            message = "User already exists with this email.";
          } else {
            message = errorText || `Error ${res.status}: Unable to register.`;
          }

          return { success: false, message };
        }

        const data = await res.json();
        set({ user: data.user });
        localStorage.setItem("user", JSON.stringify(data.user));
        return { success: true, message: "Registration successful!" };

      } catch (err) {
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
        set({ user: data.user });
        localStorage.setItem("user", JSON.stringify(data.user));
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

        const res = await fetch("/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        set({ user: data.user });
        localStorage.setItem("user", JSON.stringify(data.user));
      } catch (err) {
        console.warn("Failed to fetch user from /api/user/me:", err.message);
        localStorage.removeItem("user");
        set({ user: null });
      }
    },
  };
});
