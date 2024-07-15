import React from 'react';
import { Link } from 'react-router-dom';

const CarList = ({ cars }) => {
  return (
    <div>
      <h2>Available Cars</h2>
      <ul>
        {cars.map(car => (
          <li key={car._id}>
            <Link to={`/cars/${car._id}`}>
              <strong>{car.car_mm}</strong> - {car.car_year}, {car.car_color}, ${car.car_price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
