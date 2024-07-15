import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';


const CarDetailsPage = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    fetch(`/api/cars/${carId}`)
      .then(response => response.json())
      .then(data => setCar(data));
  }, [carId]);

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Container className="pt-4">
        <div className="car-details">
          <img src={car.image_url} alt={`${car.make} ${car.model}`} className="img-fluid" />
          <h1>{car.make} {car.model}</h1>
          <p>Year: {car.year}</p>
          <p>Price: ${car.price}</p>
          <p>{car.description}</p>
          <Button variant="primary">Add to Cart</Button>
        </div>
      </Container>
    </div>
  );
};

export default CarDetailsPage;
