import { useEffect, useState } from "react";
import "./product.css";
import axios from "axios";

export const Products = ({addToCart, category}) => {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   const filteredProducts = products.filter(product => category === 'all' ? true : product.category === category);
  //   setFilteredProducts(filteredProducts);
  // }, [category]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/all/products`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="products-container">
      {loading ? <h1 className="no-products-found">Loading...</h1> : 
      products?.length === 0 ? <h1 className="no-products-found">No product found</h1> : 
      products?.length > 0 ? 
      products?.map((product, i) => (
        <div key={i} className="product-card">
          <div className="product-image-container">
          <img className="product-image" src={product.image} alt={product.name} />
          </div>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">₹{product.price}</p>
          <div className="product-description-container">
            <p className="product-description-heading">Description:</p>
            <p className="product-description">{product?.description}</p>
          </div>
          <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      )) : ""}
    </div>
  )
}
