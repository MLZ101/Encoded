
import React from 'react';
import './Card.css';

function Card({ image, title, description }) {
  return (
    <div className="card-container">
      <img src={image} alt="Card" className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
}

export default Card;
