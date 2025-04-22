import React from 'react';

function FlagImage({ flag, name }) {
  return (
    <img
      src={flag}
      alt={`${name} flag`}
      className="flag-image"
    />
  );
}

export default FlagImage;