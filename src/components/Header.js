import React, { useState, useEffect } from 'react';
import '../App.css';
import FlagImage from './Flag';

function Header({ searchTerm, onFlagsLoaded }) {
  const [flags, setFlags] = useState([]);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetch('https://countries-api-abhishek.vercel.app/countries')
      .then((response) => response.json())
      .then((data) => {
        setFlags(data.data);
        onFlagsLoaded(data.data); // Pass the loaded flags to App.js
      })
      .catch((err) => console.error('Error fetching flags:', err));
  }, [onFlagsLoaded]);

  const filteredFlags = searchTerm
    ? flags.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : flags;

  const handleMouseEnter = (country, event) => {
    setHoveredCountry(country);
    setCursorPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
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
        <div className="flag-track">
          {filteredFlags.map((country, index) => (
            <div
              key={index}
              onMouseEnter={(event) => handleMouseEnter(country, event)}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              <FlagImage flag={country.flag} name={country.name} />
            </div>
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
            <p><strong>{hoveredCountry.name}</strong></p>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;