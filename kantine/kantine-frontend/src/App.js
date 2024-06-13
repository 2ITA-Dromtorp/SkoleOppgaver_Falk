import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './Products';
import AddProduct from './AddProduct';
import './App.css';


function App() {
  return (
    <>
    <div className ="nav">
      <h1>Drømtorp Kantine</h1>
    </div>
    <div className ="underNav">
      <p>Tilgjengelige varer i kantinen</p>
    </div>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/add" element={<AddProduct />} />
        </Routes>
      </div>
    </Router>
    </>
  );
}



export default App;
