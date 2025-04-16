import React, { useState } from 'react';
import '../App.css';

function Header({ searchTerm }) {
  const [flags, setFlags] = useState([]);
  const [isScrolling, setIsScrolling] = useState(true);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    fetch('https://countries-api-abhishek.vercel.app/countries')
      .then((response) => response.json())
      .then((data) => {
        setFlags(data.data);
        setDataLoaded(true);
      })
      .catch((err) => console.error('Error fetching flags:', err));
  }

  const filteredFlags = searchTerm
    ? flags.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : flags;

  const handleMouseEnter = (country, event) => {
    setIsScrolling(false);
    setHoveredCountry(country);
    setCursorPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setIsScrolling(true);
    setHoveredCountry(null);
  };

  const handleMouseMove = (event) => {
    setCursorPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <header className="App-header">
      <div>
        <label htmlFor="search" className="title-label">
          MIDTERM PROJECT
        </label>
      </div>
      <div className="flag-marquee">
        <div
          className="flag-track"
          style={{
            animationPlayState: isScrolling ? 'running' : 'paused',
          }}
        >
          {filteredFlags.map((country, index) => (
            <img
              key={index}
              src={country.flag}
              alt={`${country.name} flag`}
              className="flag-image"
              onMouseEnter={(event) => handleMouseEnter(country, event)}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            />
          ))}
        </div>

        {hoveredCountry && (
          <div
            className="hovered-country-modal"
            style={{
              top: `${cursorPosition.y + 10}px`,
              left: `${cursorPosition.x + 10}px`,
            }}
          >
            <strong>{hoveredCountry.name}</strong>
            <br />
            Capital: {hoveredCountry.capital || 'N/A'}
            <br />
            Region: {hoveredCountry.region || 'N/A'}
            <br />
            Population: {hoveredCountry.population?.toLocaleString() || 'N/A'}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
