import './App.css';
import React from 'react'
import Header from './components/Layout/Header/Header'
import Footer from './components/Layout/Footer/Footer'
import Home from './components/Home/Home'
import ProductDetails from './components/product/productDetails';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route  exact path="/product/:id" element={<ProductDetails/>}></Route>
      </Routes>
      <Footer />
    </Router>

  );
}

export default App;
