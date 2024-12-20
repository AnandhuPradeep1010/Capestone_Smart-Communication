import "./App.css";
import { useState } from "react";
import { Products } from "./components/product/products";
import WelcomeSection from "./components/welcome/welcome";
import { Checkout } from "./components/Checkout/Checkout";
import { Navbar } from "./components/Navbar/Navbar";
import { Awards } from "./components/awards/Awards";
import { BestSelling } from "./components/bestSelling/BestSelling";
import { AppRoutes } from "./components/Routes";

function App() {

  return (
    <div className="App">
      <AppRoutes/>
      {/* <NotificationContainer/> */}
    </div>
  );
}

export default App;