import React, { useState } from "react";
import axios from "axios";

export const CreateProduct = ({ token }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // 🖼️ selected image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !image) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image); // 👈 attaches the file

    try {
      const response = await axios.post("http://localhost:5000/api/products/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Product created successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to create product");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Create Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      /><br /><br />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      /><br /><br />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        required
      /><br /><br />
      <button type="submit">Create Product</button>
    </form>
  );
};

export default CreateProduct;
