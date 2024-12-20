import { useEffect, useState } from "react";
import "./Sidebar.css";

function Sidebar({ isSidebarOpen, setIsSidebarOpen, handleCategoryChange }) {

  const [userType, setUserType] = useState("");

  useEffect(() => {
    setUserType(localStorage.getItem("userType"));
  }, []);

  return (
    //   <div className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
    //     <button className="close-btn" onClick={() => setSidebarOpen(false)}>x</button>
    //     <nav className="sidebar-nav">
    //       <ul>
    //         <li><a href="#about">About</a></li>
    //         <li><a href="#awards">Awards</a></li>
    //         <li><a href="#best-selling">Best Selling</a></li>
    //         <li><a href="#all-products">All Products</a></li>
    //       </ul>
    //     </nav>
    //   </div>

    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      {/* <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>
        ✕
      </button> */}
      <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>✕</button>
      <div className="category-buttons">
        <button onClick={() => handleCategoryChange("home")}>Home</button>
        <button onClick={() => handleCategoryChange("awards")}>Awards</button>
        <button onClick={() => handleCategoryChange("best-selling")}>Best Selling</button>
        <button onClick={() => handleCategoryChange("products")}>Products</button>
        {userType === "seller" ? <button onClick={() => handleCategoryChange("my-products")}>My Products</button> : ""}
        {userType === "seller" ? <button onClick={() => handleCategoryChange("upload-products")}>Upload Products</button> : ""}
        {userType === "seller" ? <button onClick={() => handleCategoryChange("add-banner")}>Add Banner</button> : ""}
        {userType === "seller" ? <button onClick={() => handleCategoryChange("my-banner")}>My Banner</button> : ""}
      </div>
    </div>
  );
}

export default Sidebar;
