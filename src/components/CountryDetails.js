import React from 'react';

function CountryDetails({ country }) {
  if (!country) return null;

  return (
    <div>
      <p><strong>Name:</strong> {country.name}</p>
      <p><strong>Capital:</strong> {country.capital || 'N/A'}</p>
      <p><strong>Region:</strong> {country.region || 'N/A'}</p>
      <p><strong>Population:</strong> {country.population?.toLocaleString() || 'N/A'}</p>
    </div>
  );
}

export default CountryDetails;