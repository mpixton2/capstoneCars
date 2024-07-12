import React from 'react';
import { Link } from 'react-router-dom';
import './CarCard.css';

const CarCard = ({ car }) => {
  return (
    <div className="car-card">
      <img src={car.image_url} alt={`${car.make} ${car.model}`} />
      <h3>{car.make} {car.model}</h3>
      <p>${car.price}</p>
      <Link to={`/cars/${car.car_id}`}>View Details</Link>
    </div>
  );
};

export default CarCard;
