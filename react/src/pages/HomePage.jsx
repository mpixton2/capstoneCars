// HomePage.js

import React, { useState, useEffect } from 'react';
import SearchBox from '../components/SearchBox';
import CarList from '../components/CarList';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/cars'); 
        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }
        const data = await response.json();
        console.log(data); 
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
  
    fetchData();
  }, []);
  
  
  

  return (
    <div>
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
