import React, { useEffect, useState } from "react";
import cartpng from "../../assets/cart.png";
// import { FaBars } from "react-icons/fa";
import "./navbar.css";
import menuicon from "../../assets/menu.png";
import Sidebar from "../Sidebar/Sidebar";
// import { useNavigate } from "react-router-dom";

export const Navbar = ({ showCart, setShowCart, cartItems, handleCategoryChange, setCartItems }) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [userType, setUserType] = useState(localStorage.getItem("userType"));

  useEffect(() => {
    setUserName(localStorage.getItem("userName"));
    setUserType(localStorage.getItem("userType"));
    if(userName=== ""){
     localStorage.removeItem("userName");
     localStorage.removeItem("token");
     localStorage.removeItem("userType");
     localStorage.removeItem("userId"); 
     setCartItems([]);
    }
  }, [userName]);
  
  return (
    <>
      <nav className="navbar">
        <div className="menu-section">
          {/* <FaBars className="menu-icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} /> */}
          <img onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="menu-icon-img" src={menuicon} alt="menu" />
          <h1 style={{ 
            color: '#333',
            fontWeight: 'bold',
            fontSize: '2.8rem',
            padding: '10px',
            letterSpacing: '3px',
            fontFamily: "'Montserrat', sans-serif",
            marginBottom: '5px',
            position: 'relative',
            borderBottom: '2px solid #333'
          }}>CraftVista</h1>
        </div>
        <div className="nav-items">
          {userType === "user" && (
            <button className="cart-btn" onClick={() => setShowCart(!showCart)}>
              <img className="cart-icon" src={cartpng} alt="cart" />
              Cart ({cartItems.length})
            </button>
          )}
          {
            userName ? 
            <div className="logout-dropdown">
              <div className="user-name" onClick={() => setShowLogOut(!showLogOut)}>
                {userName}
              </div>
              {showLogOut && (
                <div className="logout-options">
                  <button className="logout-btn" onClick={() => setUserName("")}>
                    Sign Out
                  </button>
                </div>
              )}
            </div>        
          :       
            <div className="login-dropdown">
              <button className="login-btn" onClick={() => setShowDropdown(!showDropdown)}>Login</button>
              {showDropdown && (
                <div className="dropdown-content">
                  <button className="dropdown-btn" onClick={() => window.location.href="/login?userType=user"}>User Login</button>
                  <button className="dropdown-btn" onClick={() => window.location.href="/login?userType=seller"}>Seller Login</button>
                </div>
              )}
            </div>
          }
        </div>
      </nav>

      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} handleCategoryChange={handleCategoryChange} />
    
    </>
  );
};