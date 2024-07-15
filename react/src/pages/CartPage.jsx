import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CartPage = () => {
  const [orderId] = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [order, setOrder] = useState([]);
  const [car, setCar] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:3000/orders_cars/${orderId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cart');
        }
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    const fetchCars = async () => {
      try {
        const response = await fetch(`http://localhost:3000/orders_cars/${carId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch car');
        }
        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.error('Error fetching car:', error);
      }
    };

    fetchCar();
  }, [carId]);
    fetchOrder();
    fetchCars();
  }, [orderId]);

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:3000/orders_cars/${itemId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }
      setCartItems(cartItems.filter(item => item._id !== itemId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div>
      <Container className="pt-4">
        <h1>Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <Card key={item._id} className="my-3">
                <Card.Body>
                  <Card.Title>{item.car_mm} {item.car_model}</Card.Title>
                  <Card.Text>Price: ${item.car_price}</Card.Text>
                  <Button variant="danger" onClick={() => handleRemoveItem(item._id)}>Remove</Button>
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
