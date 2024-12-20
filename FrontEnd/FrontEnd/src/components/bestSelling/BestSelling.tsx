import React, { useEffect, useState } from "react";
import "./bestSelling.css";
// import productsData from "../../Utils/products";
import axios from "axios";

export const BestSelling = ({addToCart, category}) => {

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post(`http://localhost:9000/best/seller/products/`);
        // console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="best-selling-products-container">
      {loading ? <h1 className="best-selling-no-products-found">Loading...</h1> : 
      products?.length === 0 ? <h1 className="best-selling-no-products-found">No product found, Please wait for some time.</h1> : 
      
      products?.length > 0 ? 
      products?.map((product: any, i) => (    
      <div key={i} className="best-selling-product-card">
        <div className="best-selling-product-image-container">
          <img className="best-selling-product-image" src={product?.image} alt={product?.name} />
        </div>
        <h3 className="best-selling-product-name">{product?.name}</h3>
        <p className="best-selling-product-price">₹{product?.price}</p>
        <p className="best-selling-product-no-of-sales">No of sales: {product?.sellCount ?? 0}</p>
        <div className="best-selling-product-description-container">
            <p className="best-selling-product-description-heading">Description:</p>
            <p className="best-selling-product-description">{product?.description}</p>
          </div>
        <button className="best-selling-add-to-cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
      )) : ""}
    </div>
  )
}
