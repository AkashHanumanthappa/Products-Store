import { useEffect } from "react";
import { useProductStore } from "../store/product";

function MyProductsPage() {
  const { products, fetchMyProducts } = useProductStore();

  useEffect(() => {
    fetchMyProducts();
  }, []);

  return (
    <div>
      <h2>My Products</h2>
      {products.length === 0 ? (
        <p>No products created yet.</p>
      ) : (
        products.map((product) => (
          <div key={product._id}>
            <h4>{product.name}</h4>
            <p>Price: ₹{product.price}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyProductsPage;