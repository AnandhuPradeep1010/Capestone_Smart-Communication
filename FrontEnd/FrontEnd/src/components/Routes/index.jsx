import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Home } from "../home/home";
import Login from "../login_and_signup/login";
import Signup from "../login_and_signup/signup";
import { PageNotFound } from "../404/404";
// import { Login } from "../login/login";
// import { Home } from "../home/home";
    
export const AppRoutes = () => {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route exact path='/signup' element={<Signup/>}/>
      <Route path="*" element={<PageNotFound/>} />
      {/* <Route exact path='/user' element={<User/>}/> */}
      {/* <Route exact path='/admin' element={<Admin/>}/> */}
      {/* <Route exact path='/addbike' element={<Addbike/>}/> */}
    </Routes>
  </Router>
  );
};