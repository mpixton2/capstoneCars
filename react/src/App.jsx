import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CarDetailsPage from "./pages/CarDetailsPage";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import { Container } from "react-bootstrap"; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Container className="pt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cars/:id" component={CarDetailsPage} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
