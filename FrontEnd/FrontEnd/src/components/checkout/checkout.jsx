import React, { useState } from "react";
import "./styles.css";

export const Checkout = ({
  loading,
  showCart,
  setShowCart,
  cartItems,
  updateQuantity,
  removeFromCart,
  calculateTotal,
  handleCheckout,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    cardNumber: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePayClick = () => {
    if(cartItems.length === 0){
      alert("Your cart is empty, please add some items to your cart.");
    }
    else{
      setIsModalOpen(true);
    }
  };

  const handleModalSubmit = async () => {
    console.log(formData);
    if(formData.name && formData.address && formData.cardNumber && formData.email){
      await handleCheckout();
      setIsModalOpen(false);
    }
    else{
      alert("Please fill all the fields");
    }
  };

  return (
    <>
      {showCart ? (
        <div className="cart-menu">
          <div className="cart-container">
            <div className="cart-header">
              <h2>Shopping Cart</h2>
              <button onClick={() => setShowCart(false)} className="cancel-button">
                X
              </button>
            </div>
            <div className="cart-items">
              {cartItems.map((item, i) => (
                <div key={i} className="cart-item">
                  <div className="cart-item-container">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h3 className="item-name">{item.name}</h3>
                      <p className="item-price">₹{item.price}</p>
                    </div>
                  </div>
                  <div className="quantity-controls-container">
                    <div className="quantity-controls">
                      <button className="quantity-btn" onClick={() => updateQuantity(item.id, -1)}>
                        -
                      </button>
                      <span className="quantity-count">{item.quantity}</span>
                      <button className="quantity-btn" onClick={() => updateQuantity(item.id, 1)}>
                        +
                      </button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-total">
              <h3 className="item-price">Total: ₹{calculateTotal()}</h3>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button className="checkout-btn" onClick={handlePayClick}>
                  {loading ? "Loading..." : "Pay"}
                </button>
                <button
                  className="checkout-btn"
                  onClick={() => setShowCart(false)}
                  style={{ backgroundColor: "#dc3545" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {isModalOpen && (
        <div className="payment-modal">
          <div className="payment-modal-content">
            <h2 className="payment-modal-heading">Payment Details</h2>
            <input
              className="payment-modal-input"
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              className="payment-modal-input"
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
            />
            <input
              className="payment-modal-input"
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={formData.cardNumber}
              onChange={handleInputChange}
            />
            <input
              className="payment-modal-input"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <button className="payment-modal-button" onClick={handleModalSubmit}>Submit Payment</button>
            <button className="payment-modal-button-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};