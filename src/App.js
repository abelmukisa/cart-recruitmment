import React from 'react'
import "./App.css";
import Features from "./components/Features";
import Header from "./components/Header";
// import CartItems from "./components/CartItems"
import Products from './components/Products';
// import Paginate from './components/Paginate';




function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Features />
      <Products />
    </div>
  );
}

export default App;
