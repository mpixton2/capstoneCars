import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CarDetailsPage from "./pages/CarDetailsPage";
import CartPage from "./pages/CartPage";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckoutPage from "./pages/CheckoutPage"

function App() {
  return (
    <Router>
      <Container className="">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cars/:carId" element={<CarDetailsPage />} />
          <Route path="/cart/:orderId" element={<CartPage />} /> 
          <Route path="/checkout/:orderId" element={<CheckoutPage />} /> 
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
