import React, { useEffect, useState } from 'react';

const ProductDescription = ({ part }) => {

  const [part_car_details, setPart_car_details] = useState([]);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/parts-of-cars/category/?part_id=${part.part_id}`);
        const data = await response.json();
        setPart_car_details(data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [part.part_id]);



    return (
      <div className="prod-desc-container">
        <div className="desc prod-title"><p className="desctxt">{part.part_type}</p></div>
        <div className="desc prod-stock"><p className="desctxt">In Stock</p></div>
        <div className="desc prod-price"><p className="desctxt">${part.price}</p></div>
        <div className="desc prod-desc"><p className="desctxt">Description: {part.part_description}</p></div>
        <div className="desc prod-dim"><p className="desctxt">Dimensions: {part.dimensions}</p></div>
        <div className="desc prod-weight"><p className="desctxt">Weight: {part.part_weight} lbs</p></div>
        <div className="desc prod-type"><p className="desctxt">Type: {part.part_type}</p></div>
        <div className="desc prod-category"><p className="desctxt">Category: {part.part_category}</p></div>
        <div className="desc prod-car-details"><p className="desctxt">For Cars:</p></div>
        <div className="desc prod-car-details-list">
          {part_car_details.map((car, index) => (
            <p key={index} className="desctxt">{car.make} {car.model} {car.car_year}</p>
          ))} 
      </div>
      </div>
    );
};
  export default ProductDescription;
  