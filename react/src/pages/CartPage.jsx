import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CartPage = () => {
  const { orderId } = useParams(); // Assuming orderId is passed as a route parameter
  const [orderCars, setOrderCars] = useState([]);

  useEffect(() => {
    const fetchOrderCars = async () => {
      try {
        const response = await fetch(`http://localhost:3000/orders_cars/${orderId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order cars');
        }
        const orderCarsData = await response.json();
        setOrderCars(orderCarsData);
      } catch (error) {
        console.error('Error fetching order cars:', error);
      }
    };

    fetchOrderCars();
  }, [orderId]);

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:3000/orders_cars/${itemId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }
      setOrderCars(orderCars.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <Container className="pt-4">
        <h1>Your Cart</h1>
        {orderCars.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {orderCars.map((item) => (
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
