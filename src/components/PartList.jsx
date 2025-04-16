import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './partlist.css';

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
    <div className='container'>
      {loading && <p className='loading'>Loading parts...</p>}
      {error && <p className='error'>{error}</p>}

      <div className='scrollList'>
        {parts.length > 0 ? (
          parts.map((part) => (
            <div key={part.part_id} className='card'>
              <img
                src={part.part_image || 'https://via.placeholder.com/150'}
                alt={part.part_type}
                className='image'
              />
              <div className='info'>
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
                onClick={() => navigate(`/proddetail/${part.part_id}`)}
                className='PLbutton'
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


export default PartList;
