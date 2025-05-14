import { create } from "zustand";

export const useAuthStore = create((set) => {
  // Load user from localStorage safely
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
    user: savedUser,
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
  };
});
