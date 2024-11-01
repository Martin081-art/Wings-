import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Lock from './pages/Lock'; 
import Product from './pages/Product'; 
import Purchases from './pages/Purchases'; 
import Users from './pages/Users'; 

function App() {
  // Define internal CSS styles for navigation
  

  return (
    <Router>
      <div className="App">
        

        <Routes>
          <Route path="/" element={<Lock />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Purchases" element={<Purchases />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/Users" element={<Users />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
