import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar'; 

const CarDetailsPage = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`http://localhost:3000/cars/${carId}`);
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

  const handleAddToCart = async () => {
    try {
      const nextOrderId = new Date().getTime().toString(); 
      setOrderId(nextOrderId);

      const orderResponse = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: nextOrderId,
          order_payment: 'Credit Card',
          order_address_num: '123',
          order_address_street: 'Main St',
          order_address_state: 'CA',
          order_zip: '90001',
        }),
      });
      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }
      const orderResult = await orderResponse.json();
      console.log('Created order:', orderResult);

      const orderCarResponse = await fetch('http://localhost:3000/orders_cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: nextOrderId,
          car_id: carId,
        }),
      });
      if (!orderCarResponse.ok) {
        throw new Error('Failed to add car to cart');
      }
      const orderCarResult = await orderCarResponse.json();
      console.log('Added car to cart:', orderCarResult);

      setOrderSuccess(true);
    } catch (error) {
      console.error('Error adding car to cart:', error);
    }
  };

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar orderId={orderId} /> 
      <Container className="pt-4">
        <div className="car-details">
          <h1>{car.car_mm} {car.car_model}</h1>
          <p>Year: {car.car_year}</p>
          <p>Color: {car.car_color}</p>
          <p>Price: ${car.car_price}</p>
          <p>Used: {car.car_used}</p>
          <Button variant="primary" onClick={handleAddToCart}>
            {orderSuccess ? 'Added to Cart!' : 'Add to Cart'}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default CarDetailsPage;
