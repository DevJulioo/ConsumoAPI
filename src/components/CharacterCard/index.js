import React from "react";
import './CharacterCard.css';

const CharacterCard = ({ id, name, image, gender }) => {
    return (
        <div className="card">
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p>ID: {id}</p>
            <p>Gênero: {gender}</p> 
        </div>
    );
};

export default CharacterCard;
