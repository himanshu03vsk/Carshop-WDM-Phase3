import React, { useState } from "react";
import CategoryList from '../components/CategoryList';
import CarSearch from '../components/CarSearch';
import PartList from '../components/PartList';

const ProductListing = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [carFilters, setCarFilters] = useState({ make: '', model: '', year: '' });
  
    const handleSearch = (filters) => {
        setSelectedCategory(null); 
        setCarFilters(filters);  
      };
  
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <CarSearch onSearch={handleSearch} />
      </div>
  
        <div style={{ display: 'flex', width: '90%', margin: '0 auto' }}>
          <div style={{ flex: '0 0 30%' }}>
          <CategoryList
            onCategorySelect={(cat) => {
                setCarFilters({ make: '', model: '', year: '' }); 
                setSelectedCategory(cat);                
            }}
            />
          </div>
          <div style={{ flex: '0 0 70%' }}>
            <PartList category={selectedCategory} carFilters={carFilters} />
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductListing;
