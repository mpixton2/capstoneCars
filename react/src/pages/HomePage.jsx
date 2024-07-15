import React, { useState, useEffect } from 'react';
import SearchBox from '../components/SearchBox';
import CarList from '../components/CarList';
import RecommendedCars from '../components/RecommendedCars';
import Navbar from '../components/Navbar';
import './HomePage.css';

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
      <Navbar />
      <h1>Welcome to the Car Store</h1>
      <SearchBox />
      <img src="bmw.jpg" alt="BMW" className="featured-car" />
      <CarList cars={cars} />
      <h2 className="my-4">Recommended Cars</h2>
      <RecommendedCars cars={recommendedCars} />
    </div>
  );
};

export default HomePage;




