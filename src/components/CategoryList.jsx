import React, { useEffect, useState } from 'react';
import './categorylist.css';

const CategoryList = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/parts/categoryList', {
          headers: {
            'Content-Type': 'application/json', 
          },
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`API error: ${res.status} ${errText}`);
        }

        const data = await res.json();
        console.log('Fetched categories:', data);

        if (Array.isArray(data)) {
          const categoryList = (data)
          setCategories(categoryList);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        console.error('Error fetching categories:', err.message);
        setError(err.message);
      }
    };

    fetchCategories();
  }, []);
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Car Part Categories</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul className='partUL'>
        {categories.length > 0 ? (
          categories.map((cat, index) => (
            <li className='partLI'
              key={index}
              onClick={() => onCategorySelect(cat)} 
            >
              {cat}
            </li>
          ))
        ) : (
          !error && <li>Loading...</li>
        )}
      </ul>
    </div>
  );
};


export default CategoryList;