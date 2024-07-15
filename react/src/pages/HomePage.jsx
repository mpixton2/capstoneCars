import React, { useState, useEffect } from 'react';
import SearchBox from '../components/SearchBox';
import CarList from '../components/CarList';
import RecommendedCars from '../components/RecommendedCars';
import Navbar from '../components/Navbar';
import { Container, Row, Col } from 'react-bootstrap'; // Import necessary Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
 

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [recommendedCars, setRecommendedCars] = useState([]);

  useEffect(() => {
    fetch('/api/cars')
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.error('Error fetching cars:', error));

    fetch('/api/recommended-cars')
      .then(response => response.json())
      .then(data => setRecommendedCars(data))
      .catch(error => console.error('Error fetching recommended cars:', error));
  }, []);

  return (
    <div className="home-page">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} className="text-center">
            <h1>Welcome to the Car Store</h1>
          </Col>
          <Col xs={12} md={6} className="my-4">
            <SearchBox />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <CarList cars={cars} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;




