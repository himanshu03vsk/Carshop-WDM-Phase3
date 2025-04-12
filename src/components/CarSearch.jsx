import React, { useState } from 'react';

const PartSearch = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setResults([]);

    const query = new URLSearchParams({
      ...(make && { make }),
      ...(model && { model }),
      ...(year && { year }),
    }).toString();

    try {
      const res = await fetch(`http://localhost:3000/api/parts-of-cars/search?${query}`);
      if (!res.ok) throw new Error(`API Error: ${res.status}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>🔍 Search Car Parts</h2>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        style={{
          display: 'inline-block',
          justifyContent: 'space-between',
          textAlign: 'justify',
          gap: '15px',
          backgroundColor: '#f9f9f9',
          padding: '20px',
          borderRadius: '8px',
          flexWrap: 'wrap', // Allow wrapping of elements to next line
        }}
      >
        <input
          type="text"
          placeholder="Make (e.g. Toyota)"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Model (e.g. Corolla)"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Year (e.g. 2020)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={inputStyle}
        />
        <button
          type="submit"
          style={{
            padding: '10px',
            margin: '5px',
            backgroundColor: '#333',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            alignSelf: 'flex-end',
            width: '20%',
          }}
        >
          Search
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      {/* Display the search results */}
      <ul style={{ marginTop: '20px', paddingLeft: 0 }}>
        {results.length > 0 ? (
          results.map((part) => (
            <li
              key={part.part_id}
              style={{
                backgroundColor: '#eee',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '4px',
                listStyle: 'none',
              }}
            >
              <strong>Part ID:</strong> {part.part_id}
            </li>
          ))
        ) : (
          <li>No parts found.</li>
        )}
      </ul>
    </div>
  );
};

const inputStyle = {
  padding: '10px',
  margin: '5px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '14px',
  width: '20%',
};

export default PartSearch;
