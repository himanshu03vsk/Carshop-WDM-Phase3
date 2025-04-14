import React, { useState } from 'react';

const CarSearch = ({ onSearch }) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();

    onSearch({ make, model, year });
  };

  return (
    <div style={{ padding: '30px', width: '80%', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>Search Car Parts</h2>

      <form
        onSubmit={handleSearch}
        style={{
          display: 'inline-block',
          justifyContent: 'space-between',
          textAlign: 'justify',
          gap: '15px',
          width: '100%',
          backgroundColor: '#555',
          padding: '20px',
          borderRadius: '8px',
          flexWrap: 'wrap',
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

export default CarSearch;
