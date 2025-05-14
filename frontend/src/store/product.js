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
  fetchProduct: async () =>{
    const res = await fetch("/api/products");
    const data = await res.json();
    set({
      products:data.data
    });
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
