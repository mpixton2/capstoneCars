import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './CarDetailsPage.css';

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
      <Navbar />
      <div className="car-details">
        <img src={car.image_url} alt={`${car.make} ${car.model}`} />
        <h1>{car.make} {car.model}</h1>
        <p>Year: {car.year}</p>
        <p>Price: ${car.price}</p>
        <p>{car.description}</p>
        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default CarDetailsPage;
