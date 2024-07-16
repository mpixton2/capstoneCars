import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import RecommendedCars from '../components/RecommendedCars';

const CarDetailsPage = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Define mapping of car models to image URLs
  const carImages = {
    "Audi A3": "https://images.dealer.com/ddc/vehicles/2024/Audi/A3/Sedan/still/front-left/front-left-640-en_US.jpg",
    "Audi A6": "https://content-images.carmax.com/stockimages/2021/audi/a6/st2400-089-evoxwebmedium.png",
    "Honda Accord": "https://vehicle-images.dealerinspire.com/4d6b-18003711/1HGCY1F29RA062428/93aa35a7326cb1ac745aceeb2232e8df.png",
    "Nissan Altima": "https://cdn-ds.com/media/sz_90475/2022_Altima/2022-Nissan-Altima-SV-AWD_o.png",
    "Ford Bronco": "https://vimg.remorainc.com/dde/1fmcu0eg6bdtvwxy6/2024-ford-bronco-wildtrak-shadow-black-0.jpg?t=1717483838",
    "Toyota Camry": "https://media.rti.toyota.com/config/pub/3d/vcr/live/vehicle/TOY/2025/camry/2553/698/5db10e9a4c27dabb522402c747e8ac91754cb4625c6336923c92a888b4701b2a.png?fit=crop&wid=1200&hei=663&efcview=Exterior&bfc=off&fmt=png-alpha",
    "Toyota Corolla": "https://vehicle-images.dealerinspire.com/1598-18003360/5YFB4MDEXRP184411/52ba6505428fcaa8e8573840a67c53c0.png",
    "Dodge Challenger": "https://images.hgmsites.net/lrg/2020-dodge-challenger-srt-hellcat-rwd-angular-front-exterior-view_100812521_l.jpg",
    "Jeep Cherokee": "https://di-uploads-pod9.dealerinspire.com/zimmerchryslerdodgejeepram/uploads/2023/03/2023-Jeep-Grand-Cherokee-Overland-Black.jpg",
    "Honda Civic": "https://vehicle-images.dealerinspire.com/9bcf-110009620/thumbnails/large/2HGFE2F57RH564684/deebe9ab815b7532e0d1d349c399b532.png",
    "Cadillac Escalade": "https://shop.vipautoaccessories.com/cdn/shop/products/Profile_a3cdee2d-dcae-45a1-9ac0-67df4e3c3965.jpg?v=1676323971",
    "Ford Escape": "https://file.kelleybluebookimages.com/kbb/base/evox/CP/52981/2024-Ford-Escape-front_52981_032_1856x876_UM_cropped.png",
    "Ford Expedition": "https://di-uploads-pod39.dealerinspire.com/kingsford/uploads/2019/11/2020-Ford-Expedition-Cincinnati-OH-left.jpg",
    "Toyota Land Cruiser": "https://cdn.motor1.com/images/mgl/G33kRx/s1/toyota-land-cruiser-prado-matte-black-edition.jpg",
    "Toyota RAV4": "https://assets.flowfound.com/cars/2023/2023%20Toyota%20RAV%204.jpg",
    "Toyota Sienna": "https://beeblackcar.com/wp-content/uploads/2023/01/WhatsApp_Image_2023-01-12_at_3.00.46_PM-removebg-preview.png",
    "Chevrolet Tahoe": "https://di-uploads-pod5.dealerinspire.com/mccluskeychevy/uploads/2018/12/2019-Chevrolet-Tahoe-model-black.jpg",
    "Jeep Wrangler": "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/90cd7865-0dd7-43b7-9aa2-ae440ca71ef6/bb6e65a3-8cfe-46e2-855b-43a6bb694cab.png",
    "Toyota 4Runner": "https://images.dealer.com/autodata/us/color/2023/USD30TOS072E0/218.jpg"
  };

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`http://localhost:3000/cars/${carId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch car');
        }
        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.error('Error fetching car:', error);
      }
    };

    fetchCar();
  }, [carId]);

  const handleAddToCart = async () => {
    try {
      const nextOrderId = new Date().getTime().toString();

      const orderResponse = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: nextOrderId,
          order_timestamp: new Date().toISOString(),
          order_payment: 'Credit Card',
          order_address_num: '123',
          order_address_street: 'Main St',
          order_address_state: 'CA',
          order_zip: '90001',
          order_completed: false,
        }),
      });
      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }
      const orderResult = await orderResponse.json();

      const orderCarResponse = await fetch('http://localhost:3000/orders_cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: nextOrderId,
          car_id: carId,
        }),
      });
      if (!orderCarResponse.ok) {
        throw new Error('Failed to add car to cart');
      }
      const orderCarResult = await orderCarResponse.json();
      setOrderSuccess(true);
      setOrderId(nextOrderId);
    } catch (error) {
      console.error('Error adding car to cart:', error);
    }
  };

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar orderId={orderId} />
      <Container className="pt-4">
        <div className="car-details">
          <h1>{car.car_mm} {car.car_model}</h1>
          <Image src={carImages[car.car_mm]} alt={car.car_mm} fluid style={{ maxWidth: '100%', height: 'auto' }} />
          <p>Year: {car.car_year}</p>
          <p>Color: {car.car_color}</p>
          <p>Price: ${car.car_price}</p>
          <p>{car.car_used ? 'Used' : 'New'}</p>
          <Button variant="primary" onClick={handleAddToCart}>
            {orderSuccess ? 'Added to Cart!' : 'Add to Cart'}
          </Button>
        </div>
      </Container>
      <RecommendedCars car={car}/>
    </div>
  );
};

export default CarDetailsPage;
