// src/components/RecommendedCars.jsx

import React from 'react';
import { useState, useEffect } from "react";

const PORT_NUMBER = 5000;
const END_POINT = `http://localhost:${PORT_NUMBER}/`;

const FetchResults = async (body, setData) => {
  try {
    const response = await fetch(END_POINT + "api/predict", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!response.ok)
      throw new Error(`Response status: ${response.status}`);

    const json = await response.json();
    setData(JSON.stringify(json));
  } catch (e) {
    console.error("Error fetching from FetchResults: ", e);
  }
};

const FetchCar = async (data, setCars) => {
  const json = {}
  for (let i = 0; i < 3; i++) {
    let carid = data[i]
    try {
      const response = await fetch(END_POINT + `api/car/${carid}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      if (!response.ok)
        throw new Error(`Response status: ${response.status}`);

      json.append(await response.json());
      
    } catch (e) {
      console.error("Error fetching from FetchResults: ", e);
    }
  }
  setCars(JSON.stringify(json));
}

const RecommendedCars = (props) => {
  const [data, setData] = useState('');
  const [cars, setCars] = useState('');
  FetchResults(body, setData)
  FetchCars(data, setCars)
  return (
    <div>
      <h4>Rocommended Cars</h4>
      <Row>
        {cars.map(car => (
          <Col key={car._id} xs={12} sm={6} md={4} className="mb-3">
            <ListGroup.Item>
              <Link to={`/cars/${car.car_id}`}>
                <strong>{car.car_mm}</strong> - {car.car_year}, ${car.car_price}
              </Link>
            </ListGroup.Item>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default RecommendedCars;





