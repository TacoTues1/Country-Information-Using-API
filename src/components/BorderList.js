import React from 'react';

function BorderList({ borders }) {
  if (!borders || borders.length === 0) return <p>No borders available.</p>;

  return (
    <ul>
      {borders.map((border, index) => (
        <li key={index}>{border}</li>
      ))}
    </ul>
  );
}

export default BorderList;