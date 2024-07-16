import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';

const CartPage = () => {
  const { orderId } = useParams();
  const [orderCars, setOrderCars] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [carDetailsMap, setCarDetailsMap] = useState({});
  const [showMore, setShowMore] = useState(false);
  const [pricesArray, setPricesArray] = useState([]);

  useEffect(() => {
    const fetchOrderCars = async () => {
      try {
        const response = await fetch(`http://localhost:3000/orders_cars/${orderId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order cars');
        }
        const orderCarsData = await response.json();
        setOrderCars(orderCarsData.slice(0, 30));
        setShowMore(orderCarsData.length > 30);
      } catch (error) {
        console.error('Error fetching order cars:', error);
      }
    };

    fetchOrderCars();
  }, [orderId]);

  useEffect(() => {
    const fetchCarDetails = async () => {
      const carIds = orderCars.map(item => item.car_id);
      const uniqueCarIds = [...new Set(carIds)]; // Ensure unique car IDs

      try {
        const promises = uniqueCarIds.map(async (carId) => {
          if (!carDetailsMap[carId]) {
            const response = await fetch(`http://localhost:3000/cars/${carId}`);
            if (!response.ok) {
              throw new Error(`Failed to fetch car details for car ID ${carId}`);
            }
            const carDetails = await response.json();
            return {
              carId: carId,
              details: carDetails,
            };
          } else {
            return {
              carId: carId,
              details: carDetailsMap[carId],
            };
          }
        });

        const carDetailsArray = await Promise.all(promises);

        // Populate pricesArray with fetched prices
        const updatedPricesArray = carDetailsArray.map(car => car.details.car_price);
        setPricesArray(updatedPricesArray);

        // Update carDetailsMap with fetched details
        const updatedCarDetailsMap = { ...carDetailsMap };
        carDetailsArray.forEach((car) => {
          updatedCarDetailsMap[car.carId] = car.details;
        });
        setCarDetailsMap(updatedCarDetailsMap);

      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    if (orderCars.length > 0) {
      fetchCarDetails();
    }
  }, [orderCars, carDetailsMap]);

  useEffect(() => {
    // Calculate total price whenever pricesArray changes
    let total = 0;
    pricesArray.forEach((price) => {
      total += price;
    });
    setTotalPrice(total);
  }, [pricesArray]);

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

  const handleShowMore = () => {
    console.log('Show more cars');
    // Implement logic to fetch more cars or toggle visibility of additional cars
    // This could involve fetching more data or expanding the list
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
            {orderCars.map((item, index) => (
              <Card key={item._id} className="my-3">
                <Card.Body>
                  <Card.Title>{carDetailsMap[item.car_id] ? `${carDetailsMap[item.car_id].car_mm}, ${carDetailsMap[item.car_id].car_color}, ${carDetailsMap[item.car_id].car_year}, ${carDetailsMap[item.car_id].car_used ? 'Used' : 'New'}, $${carDetailsMap[item.car_id].car_price}` : 'Car Details Not Available'}</Card.Title>
                  <Button variant="danger" onClick={() => handleRemoveItem(item._id)}>Remove</Button>
                </Card.Body>
              </Card>
            ))}
            {showMore && (
              <Button variant="primary" onClick={handleShowMore} className="mt-3">
                + More
              </Button>
            )}
            <div className="mt-4">
              <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
              <Button variant="primary" onClick={() => console.log('Checkout button clicked')}>Checkout</Button>

            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CartPage;
