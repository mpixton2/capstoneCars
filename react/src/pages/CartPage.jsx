import React from 'react';
import Navbar from '../components/Navbar';
import { Container, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CartPage = () => {
  // Replace with cart state and logic
  const cartItems = []; 

  return (
    <div>
      <Container className="pt-4">
        <h1>Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {cartItems.map((item, index) => (
              <Card key={index} className="my-3">
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>Quantity: {item.quantity}</Card.Text>
                  <Button variant="danger">Remove</Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default CartPage;
