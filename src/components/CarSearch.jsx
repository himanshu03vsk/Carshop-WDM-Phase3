import React, { useState } from 'react';
import './carsearch.css';

const CarSearch = ({ onSearch }) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();

    onSearch({ make, model, year });
  };

  return (
    <div style={{ padding: '30px', width: '70%', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>Search Car Parts</h2>

      <form className='CSform'
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Make (e.g. Toyota)"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          className="CSinput"
        />
        <input
          type="text"
          placeholder="Model (e.g. Corolla)"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="CSinput"
        />
        <input
          type="number"
          placeholder="Year (e.g. 2020)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="CSinput"
        />
        <button className='CSbutton'
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default CarSearch;
