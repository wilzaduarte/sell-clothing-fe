import React from 'react';

const DetailsModal = ({ itemName }) => {
  return (
    <div className="details-modal">
      <h2> Details for {itemName}</h2>
      <p>Size: S, M, L</p>
      <p>Color: Blue</p>
      <p>Style: Casual </p>
    </div>
  );
};

export default DetailsModal;