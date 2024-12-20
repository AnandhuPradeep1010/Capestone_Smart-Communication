import { useState } from "react";
import { Awards } from "../awards/Awards";
import { BestSelling } from "../bestSelling/BestSelling";
import { Navbar } from "../Navbar/Navbar";
import { Products } from "../product/products";
import WelcomeSection from "../welcome/welcome";
import { MyProducts } from "../seller/my_products";
import { UploadProducts } from "../seller/uploadProducts";
import axios from "axios";
import { AddBanner } from "../seller/addBanner";
import { Checkout } from "../checkout/checkout";
import { MyBanner } from "../seller/my_banner";

export const Home = ({}) => {

  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [category, setCategory] = useState('home');
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (category) => {
    setCategory(category);
  }

  // additionally added quantity to the product
  const addToCart = (product) => {
    let isExist = false;
    // prevent duplicate products
    cartItems?.map((item)=> {
      item.id === product.id ? isExist = true : isExist = false
    })
    if(isExist) return
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
  };

  const updateQuantity = (productId, change) => {
    // if change is -1 then decrease the quantity by 1
    if (change === -1) {
      setCartItems(
        // map through the cart items and if the id matches the product id and the quantity is greater than 1 then decrease the quantity by 1
        cartItems.map((item) =>
          item.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } 
    // if change is 1 then increase the quantity by 1
    else {
      setCartItems(
        cartItems.map((item) =>
        (item.id === productId)
          ? { ...item, quantity: item.quantity + change }
          : item
        )
      );
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };


  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    try {

      if(cartItems.length === 0){
        alert("Cart is empty, please add some products to the cart");
        return;
      }
      if(!token || !userId){
        alert("Please login to checkout");
        return;
      }
      setLoading(true);
      const response = await axios.post(`http://localhost:9000/checkout/${userId}`, {
        cartItems,
        // total: calculateTotal(),
        // address: "1234567890",
        // phone: "1234567890",
        // name: "Ananthu",
      }, {
        headers: {
          'x-auth-token': token
        }
      });
      setLoading(false);

      if(response.data.message === "Checkout successful"){
        alert("Checkout successful!");
        setCartItems([]);
      }
      else{
        alert("Checkout failed!");
      }
    } catch (error) {
      setLoading(false);
      console.error('Error checking out:', error);
    }
    
  };

  return (
    <>
    <div className="fixed-nav">
    <Navbar
      showCart={showCart}
      setShowCart={setShowCart}
      cartItems={cartItems}
      handleCategoryChange={handleCategoryChange}
      setCartItems={setCartItems}
    />
  </div>
  {/* <div className="main-content"> */}
    {
    category === 'home' ? <WelcomeSection /> : 
    category === 'awards' ? <Awards /> : 
    category === 'best-selling' ? <BestSelling addToCart={addToCart} category={category} /> : 
    category === 'products' ? <Products addToCart={addToCart} category={category} /> : 
    category === 'my-products' ? <MyProducts /> : 
    category === 'upload-products' ? <UploadProducts /> : 
    category === 'add-banner' ? <AddBanner /> :
    category === 'my-banner' ? <MyBanner /> :
    ""}
    {/* <Products addToCart={addToCart} category={category} /> */}
  {/* </div> */}
  <Checkout
    loading={loading}
    showCart={showCart}
    setShowCart={setShowCart}
    cartItems={cartItems}
    updateQuantity={updateQuantity}
    removeFromCart={removeFromCart}
    calculateTotal={calculateTotal}
    handleCheckout={handleCheckout}
  />
  </>
  )
}
