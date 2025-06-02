import React from "react";
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="signup" exact element={<SignUp/>} />
        <Route path="login" exact element={<Login/>} />
      </Routes>
    </Router>
  )
}