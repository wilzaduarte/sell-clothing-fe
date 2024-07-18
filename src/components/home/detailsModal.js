import React from 'react';

const DetailsModal = ({ itemName }) => {
  return (
    <div className="details-modal">
      <h2> Details for {itemName}</h2>
      <p>Size: S, M, L</p>
      <p>Style: Casual </p>
      <p>Color:Diverso</p>
    </div>
  );
};

export default DetailsModal;