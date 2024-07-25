// src/components/Card.js
import React from 'react';
import { useHistory } from 'react-router-dom';
import './Card.css'; // You can create this CSS file for styling

const Card = ({ title, path }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(path);
  };

  return (
    <div className="card" onClick={handleClick}>
      <h3>{title}</h3>
    </div>
  );
};

export default Card;
