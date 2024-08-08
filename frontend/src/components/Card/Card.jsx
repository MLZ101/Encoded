// Card.js
import React from 'react';
import './Card.css';

function Card({ image, title, description, link }) {
  return (
    <div className="card-container">
      {/* <img src={image} alt="Card" className="card-image" /> */}
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        {/* <a href={link} className="card-button">
          Read More
        </a> */}
      </div>
    </div>
  );
}

export default Card;
