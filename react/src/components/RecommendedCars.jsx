// src/components/RecommendedCars.jsx

import React from 'react';
import { useState, useEffect } from "react";
import { ListGroup, Row, Col } from 'react-bootstrap';

const PORT_NUMBER = 5000;
const END_POINT1 = `http://cors-anywhere.herokuapp.com/http://127.0.0.1:${PORT_NUMBER}`;
const END_POINT2 = 'http://localhost:3000'

const FetchResults = async (body, setData) => {
  try {
    const response = await fetch(END_POINT1 + "/api/predict", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });
    

    if (!response.ok)
      throw new Error(`Response status: ${response.status}`);

    const json = await response.json();
    console.log(json)
    setData(JSON.stringify(json));
    console.log(data)
  } catch (e) {
    console.error("Error fetching from FetchResults: ", e);
  }
};

const FetchCars = async (data, setCars) => {
  const json = {}
  for (let i = 0; i < 3; i++) {
    let carid = data[i]
    try {
      const response = await fetch(END_POINT2 + `/car/${carid}`, {
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
  FetchResults(props.car, setData)
  FetchCars(data, setCars)
  console.log(cars)
  console.log(data)
  return (
    <div>
      <h4>Recommended Cars</h4>
      <Row>
        {console.log(cars)}
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





