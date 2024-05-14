import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Deck({deck}) {
  
  return (
    <>
        <div className="card">
        <h2>{deck.name}</h2>
        <span>{deck.cards.length} cards</span>

        <p>{deck.description}</p>
    
        <Link to={`/decks/${deck.id}`} className="btn btn-secondary">View</Link>
        <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
        <button type="button" class="btn btn-danger">Delete</button>
        </div>
    </>
  );
}

export default Deck;
