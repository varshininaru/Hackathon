import React, { useState } from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa'; 
import data from './data/countries.json'; 

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleItemClick = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index); // Toggle expansion
  };

  const filteredCountries = searchTerm.trim()
    ? data.filter((item) =>
        item.country.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
        item.capital.toLowerCase().startsWith(searchTerm.toLowerCase())
      ).sort((a, b) => a.country.localeCompare(b.country)) 
    : [];

  return (
    <div className="page-container">
      <h2 className="search-title">Search for Countries or Capitals</h2>
      <div className="search-container">
        <div className="search-input-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for Countries or Capitals"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      </div>
      {searchTerm.trim() && (
        <div className="search-results">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((item, index) => (
              <div key={index} className="search-item">
                <div className="search-item-header" onClick={() => handleItemClick(index)}>
                  <FaSearch className="result-icon" />
                  <h3>{item.country} - {item.capital}</h3>
                </div>
                {expandedIndex === index && (
                  <div className="search-item-details">
                    <p><strong>Population:</strong> {item.population.toLocaleString()}</p>
                    <p><strong>Official Language(s):</strong> {Array.isArray(item.official_language) ? item.official_language.join(', ') : item.official_language}</p>
                    <p><strong>Currency:</strong> {item.currency}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="no-results">No countries or capitals found starting with "{searchTerm}".</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
