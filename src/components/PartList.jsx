import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PartList = ({ category, carFilters }) => {
  const [parts, setParts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const buildApiUrl = () => {
    if (category) {
      return `http://localhost:3000/api/parts/by-category?category=${encodeURIComponent(category)}`;
    } else if (carFilters.make || carFilters.model || carFilters.year) {
      const queryParams = new URLSearchParams({
        make: carFilters.make,
        model: carFilters.model,
        year: carFilters.year,
      }).toString();
      
      return `http://localhost:3000/api/parts-of-cars/search?${queryParams}`;
    }
    return null;
  };

  useEffect(() => {
    const fetchParts = async () => {
      setLoading(true);
      setError('');

      let url = buildApiUrl();
      if (!url) {
        url = 'http://localhost:3000/api/parts/catelogue';
      }

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        const data = await res.json();
        setParts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParts();
  }, [category, carFilters]);

  return (
    <div style={styles.container}>
      {loading && <p style={styles.loading}>Loading parts...</p>}
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.scrollList}>
        {parts.length > 0 ? (
          parts.map((part) => (
            <div key={part.part_id} style={styles.card}>
              <img
                src={part.part_image || 'https://via.placeholder.com/150'}
                alt={part.part_type}
                style={styles.image}
              />
              <div style={styles.info}>
                <h3 style={{ margin: '5px 0' }}>{part.part_type}</h3>
                <p><strong>Price:</strong> ${part.price}</p>
                <p>
                    <strong>Car:</strong>{' '}
                    {part.car_year ? ` ${part.car_year}` : ' '}
                    {' '}
                    {[part.make, part.model].filter(Boolean).join(' ')}
                    </p>
              </div>
              <button
                style={styles.button}
                onClick={() => navigate(`/proddetail/${part.part_id}`)}
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p>No parts found.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: 'auto'
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: 'gray'
  },
  scrollList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxHeight: '600px',
    overflowY: 'scroll',
    paddingRight: '10px',

    scrollbarWidth: 'thin',              
    msOverflowStyle: 'none', 
  },
  card: {
    display: 'flex',
    color: '#333',
    backgroundColor: '#f4f4f4',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    gap: '15px',
    alignItems: 'center'
  },
  image: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '4px'
  },
  info: {
    flex: 1
  },
  button: {
    marginTop: '10px',
    padding: '10px 15px',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '16px'
  }
};

export default PartList;
