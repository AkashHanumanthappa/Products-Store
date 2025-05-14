import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    // Basic validation
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        const errorText = await res.text(); // fallback in case JSON is invalid
        return { success: false, message: `Error ${res.status}: ${errorText}` };
      }

      const data = await res.json();
      const createdProduct = data.data;
      set((state) => ({ products: [...state.products, createdProduct] }));
      return { success: true, message: "Product created successfully" };
    } catch (err) {
      return { success: false, message: `Request failed: ${err.message}` };
    }
  },
fetchProduct: async () => {
  console.log("Fetching products..."); // Debugging log
  try {
    const res = await fetch("/api/products");

    // Check if response is successful before processing
    if (!res.ok) {
      const errorText = await res.text(); // To catch any non-JSON error responses
      console.error("Failed to fetch products:", errorText); // Log the error response body
      return;
    }

    // If the response is successful, process the JSON data
    const data = await res.json();
    console.log("Fetched products:", data); // Log the fetched data

    // Update Zustand state with the products array
    if (data.success && Array.isArray(data.data)) {
      set({ products: data.data }); // Update Zustand state with products
    } else {
      console.error("Invalid product data structure:", data);
    }
  } catch (error) {
    console.error("Error fetching products:", error); // Log any errors that happen during the fetch
  }
},
  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: 'DELETE',
      });
  
      const data = await res.json();
  
      if (!data.success) return { success: false, message: data.message };
  
      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));
  
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, message: `Failed to delete: ${err.message}` };
    }
  },
  updateProduct: async (pid, updateProduct) => {
    const res = await fetch(`/api/products/${pid}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(updateProduct),
    });
    const data = await res.json();
    if(!data.success) return {success:false, message:data.message};
    set(state =>({
      products:state.products.map((product) => (product._id === pid ? data.data : product)),
    }))
    return { success: true, message: "Product updated successfully", data: data.data };

  }
}));
