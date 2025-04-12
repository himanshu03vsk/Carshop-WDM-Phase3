import React, { useEffect, useState } from 'react';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Now you don't need the token since the API is public
        const res = await fetch('http://localhost:3000/api/parts/categoryList', {
          headers: {
            'Content-Type': 'application/json', // No token needed
          },
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`API error: ${res.status} ${errText}`);
        }

        const data = await res.json();
        console.log('Fetched categories:', data);

        // Assuming each category object has a 'part_category' field
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

      <ul style={{
        listStyle: 'none',
        padding: 0,
        maxWidth: '300px',
        margin: '20px auto',
        fontFamily: 'sans-serif',
        border: '1px solid #ccc',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        {categories.length > 0 ? (
          categories.map((cat, index) => (
            <li key={index} style={{
              padding: '12px',
              borderBottom: index !== categories.length - 1 ? '1px solid #eee' : 'none',
              backgroundColor: '#555'
            }}>
              {cat}
            </li>
          ))
        ) : (
          !error && <li>Loading...</li> // Show loading message if categories are empty and no error
        )}
      </ul>
    </div>
  );
};

export default CategoryList;