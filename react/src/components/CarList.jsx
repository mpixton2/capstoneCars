import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, Row, Col } from 'react-bootstrap';

const CarList = ({ cars }) => {
  return (
    <div>
      <h2>Available Cars</h2>
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

export default CarList;
