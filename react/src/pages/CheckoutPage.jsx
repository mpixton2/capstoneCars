// CheckoutPage.js

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';

const CheckoutPage = () => {
  const { orderId } = useParams();
  const [formData, setFormData] = useState({
    // Define state for form fields
    name: '',
    address: '',
    // Add more fields as needed
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update order');
      }
      // Optionally handle success or navigate to a success page
      console.log('Order updated successfully');
    } catch (error) {
      console.error('Error updating order:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div>
      <Navbar />
      <Container className="pt-4">
        <h1>Checkout</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>
          {/* Add more form fields as needed */}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default CheckoutPage;
