import React, { useEffect, useState } from 'react';

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

      <ul style={styles.ul}>
        {categories.length > 0 ? (
          categories.map((cat, index) => (
            <li
              key={index}
              style={styles.li}
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

const styles = {
  ul: {
    listStyle: 'none',
    padding: 0,
    maxWidth: '300px',
    margin: '20px auto',
    fontFamily: 'sans-serif',
    border: '1px solid #ccc',
    borderRadius: '4px',
    overflow: 'hidden',
    cursor: 'pointer'
  },
  li: {
    padding: '12px',
    borderBottom: '1px solid #eee',
    backgroundColor: '#555',
    color: 'white',
    transition: 'background 0.3s',
    cursor: 'pointer'
  }
};

export default CategoryList;