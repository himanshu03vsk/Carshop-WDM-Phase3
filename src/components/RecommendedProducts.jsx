import React, { useState, useEffect } from 'react';
import { InstantSearch, connectHits , Configure } from 'react-instantsearch-dom';
import { algoliasearch } from 'algoliasearch';

const searchClient = algoliasearch('7G59D8167N', '1a755d15880cfbc8269093d24e24b422');

// Component to render each product card
const ProductHit = ({ hit }) => (
  <div className="min-w-[250px] bg-white rounded shadow p-4 mx-2 flex-shrink-0">
    <h4 className="text-xl font-bold">{hit.name}</h4>
    <p className="text-gray-600">{hit.category}</p>
    <p className="text-sm text-gray-500">${hit.price}</p>
  </div>
);

// Connected hits to customize horizontal layout
const CustomHits = ({ hits }) => (
  <div className="flex overflow-x-auto no-scrollbar px-2">
    {hits.map((hit) => (
      <ProductHit key={hit.objectID} hit={hit} />
    ))}
  </div>
);
const ConnectedHits = connectHits(CustomHits);

// Main RecommendedProducts component
const RecommendedProducts = () => {
  return (
    <div className="mt-12 w-full max-w-7xl mx-auto px-6">
      <h3 className="text-2xl font-semibold mb-4">Recommended for You</h3>
      <InstantSearch searchClient={searchClient} indexName="products">
        <Configure hitsPerPage={5} />
        <ConnectedHits />
      </InstantSearch>
    </div>
  );
};

export default RecommendedProducts;
