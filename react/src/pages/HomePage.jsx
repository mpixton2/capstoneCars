import React, { useState, useEffect } from 'react';
import SearchBox from '../components/SearchBox';
import CarList from '../components/CarList';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/carslimit?page=${currentPage}&limit=10`);
        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }
        const data = await response.json();
        setCars(data);

        const totalCountResponse = await fetch(`http://localhost:3000/cars/count`);
        const totalCountData = await totalCountResponse.json();
        const totalCars = totalCountData.count;
        setTotalPages(Math.ceil(totalCars / 10)); // Assuming 10 cars per page
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Navbar />
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
        <Row className="justify-content-center">
          <Col xs={12} md={8} className="d-flex justify-content-center">
            <Pagination>
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              <Pagination.Item onClick={() => handlePageChange(currentPage)}>
                {currentPage}
              </Pagination.Item>
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
              />
            </Pagination>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
