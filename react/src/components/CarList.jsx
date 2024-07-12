import React from 'react';
import CarCard from './CarCard';
import './CarList.css';

const CarList = ({ cars }) => {
  return (
    <div className="car-list">
      {cars.map(car => (
        <CarCard key={car.car_id} car={car} />
      ))}
    </div>
  );
};

export default CarList;
