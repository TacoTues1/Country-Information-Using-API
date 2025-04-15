import React, { useState, useEffect } from 'react';
import '../App.css';

function Header({ searchTerm }) {
  const [flags, setFlags] = useState([]);
  const [isScrolling, setIsScrolling] = useState(true);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetch('https://countries-api-abhishek.vercel.app/countries')
      .then((response) => response.json())
      .then((data) => {
        const flagUrls = data.data.map((country) => ({
          name: country.name,
          flag: country.flag,
        }));
        setFlags(flagUrls);
      })
      .catch((err) => console.error('Error fetching flags:', err));
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const match = flags.find((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (match) {
        setIsScrolling(false);
      } else {
        setIsScrolling(true);
      }
    } else {
      setIsScrolling(true);
    }
  }, [searchTerm, flags]);

  const handleMouseEnter = (countryName, event) => {
    setIsScrolling(false);
    setHoveredCountry(countryName);
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
          {flags.map((country, index) => (
            <img
              key={index}
              src={country.flag}
              alt={`${country.name} flag`}
              className="flag-image"
              onMouseEnter={(event) => handleMouseEnter(country.name, event)}
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
            {hoveredCountry}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
