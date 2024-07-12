import React, { useState, useEffect } from 'react';
import SearchBox from '../components/SearchBox';
import CarList from '../components/CarList';
import Navbar from '../components/Navbar';
import './HomePage.css'; 

const HomePage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Fetch cars from the backend
    fetch('/api/cars')
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.error('Error fetching cars:', error));
  }, []);

  return (
    <div className="home-page">
      <Navbar />
      <h1>Welcome to the Car Store</h1>
      <SearchBox />
      <CarList cars={cars} />
    </div>
  );
};

export default HomePage;
