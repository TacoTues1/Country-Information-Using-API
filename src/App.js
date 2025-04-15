import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [populationFilter, setPopulationFilter] = useState('');

  const fetchCountries = () => {
    setLoading(true);
    setError(null);
    fetch('https://countries-api-abhishek.vercel.app/countries')
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => {
        setCountries(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching countries:', err);
        setError(err.message);
        setLoading(false);
      });
  };

  if (countries.length === 0 && !loading && !error) {
    fetchCountries();
  }

  const filterByPopulation = (country) => {
    if (!populationFilter) return true;
    if (populationFilter === 'small') return country.population < 1000000;
    if (populationFilter === 'medium') return country.population >= 1000000 && country.population <= 50000000;
    if (populationFilter === 'large') return country.population > 50000000;
    return true;
  };

  // const filteredCountries = countries.filter((country) => {
  //   return (
  //     country.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //     (selectedRegion ? country.region === selectedRegion : true) &&
  //     filterByPopulation(country)
  //   );
  // });
  const uniqueCountries = Array.from(
    new Map(countries.map((c) => [c.name, c])).values()
  );
  const filteredCountries = uniqueCountries.filter((country) => {
    const search = searchTerm.toLowerCase();
  
    const matchesSearch =
      country.name.toLowerCase().includes(search) ||
      (country.region && country.region.toLowerCase().includes(search)) ||
      (country.subregion && country.subregion.toLowerCase().includes(search));
  
    const matchesRegion = selectedRegion ? country.region === selectedRegion : true;
    const matchesPopulation = filterByPopulation(country);
  
    if (selectedRegion) {
      return matchesSearch && matchesRegion && matchesPopulation;
    }
  
    return matchesSearch && matchesPopulation;
  });
  
  

  const isActiveSearch = searchTerm || selectedRegion || populationFilter;

  return (
    <div className="App">
     <Header />
        <div className={`search-wrapper ${isActiveSearch ? 'search-top' : 'search-center'}`}>
          <div>
            <label htmlFor="search" className="search-label">SEARCH FOR ANY COUNTRY</label>
          </div>

          <input
            id="search"
            type="text"
            placeholder="Country name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <div className="filter-wrapper">
            <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
              <option value="">Select Regions</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>

            <select value={populationFilter} onChange={(e) => setPopulationFilter(e.target.value)}>
              <option value="">All Populations</option>
              <option value="small">&lt; 1M</option>
              <option value="medium">1M - 50M</option>
              <option value="large">&gt; 50M</option>
            </select>
          </div>
        </div>

        {loading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
          </div>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="results-container">
          {!loading && !error && isActiveSearch && filteredCountries.map((country) => (
            <div key={country.name} className="country-card">
              <div className="country-flag-container">
                {country.flag && (
                  <img
                    src={country.flag}
                    alt={`${country.name} flag`}
                    className="country-flag"
                  />
                )}
              </div>
              <div className="country-info">
                <pre>{JSON.stringify({
                  name: country.name,
                  capital: country.capital || 'N/A',
                  region: country.region || 'N/A',
                  subregion: country.subregion || 'N/A',
                  population: country.population || 'N/A',
                  area: country.area || 'N/A',
                  coordinates: country.coordinates ? {
                    latitude: country.coordinates.latitude,
                    longitude: country.coordinates.longitude
                  } : 'N/A',
                  borders: country.borders || [],
                  timezones: country.timezones || [],
                  currency: country.currency || 'N/A',
                  languages: country.languages || 'N/A',
                  flag: country.flag || 'N/A'
                }, null, 2)}</pre>
              </div>
            </div>
          ))}
        </div>
        {!loading && !error && isActiveSearch && filteredCountries.length === 0 && (
            <p className="no-result">No country found.</p>
          )}
      <Footer />
    </div>
  );
  
}
export default App;
