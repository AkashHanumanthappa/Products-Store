import { create } from "zustand";

// Get the API URL from environment variables
const API_URL = import.meta.env.PROD 
  ? 'https://products-store-akash-h.onrender.com/api'
  : '/api';

export const useProductStore = create((set) => ({
  products: [],

  setProducts: (products) => set({ products }),

  fetchProducts: async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message || "Failed to fetch products" };
      }

      set({ products: data.data });
      return { success: true };
    } catch (error) {
      console.error("Fetch Products Error:", error);
      return { success: false, message: "Server Error" };
    }
  },

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const token = localStorage.getItem("token");
      console.log("Fetched token from localStorage:", token);

      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      } else {
        return { success: false, message: "Token not found, please login again." };
      }

      const res = await fetch(`${API_URL}/products/create`, {
        method: "POST",
        headers,
        body: JSON.stringify(newProduct),
      });

      if (res.status === 401) {
        return { success: false, message: "Unauthorized. Please log in." };
      }

      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message || "Failed to create product" };
      }

      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      console.error("Create Product Error:", error);
      return { success: false, message: "Server Error" };
    }
  },

  updateProduct: async (pid, updatedProduct) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/products/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message || "Failed to update product" };
      }

      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Update Product Error:", error);
      return { success: false, message: "Server Error" };
    }
  },

  deleteProduct: async (pid) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/products/${pid}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message || "Failed to delete product" };
      }

      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Delete Product Error:", error);
      return { success: false, message: "Server Error" };
    }
  },

  fetchMyProducts: async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return { success: false, message: "Token not found, please login again." };
      }

      const res = await fetch(`${API_URL}/products/my-products`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message || "Failed to fetch your products" };
      }

      set({ products: data.data });
      return { success: true };
    } catch (error) {
      console.error("Fetch My Products Error:", error);
      return { success: false, message: "Server Error" };
    }
  },
}));