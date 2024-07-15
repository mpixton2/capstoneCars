// src/components/RecommendedCars.jsx

import React from 'react';
import CarCard from './CarCard';

const RecommendedCars = ({ cars }) => {
  return (
    <div className="row">
      {cars.map(car => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};

export default RecommendedCars;



