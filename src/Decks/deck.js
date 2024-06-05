import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteDeck } from '../utils/api'; 

function Deck({ deck, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Delete this deck? You will not be able to recover it.")) {
      try {
        await deleteDeck(deck.id);
        if (onDelete) {
          onDelete(deck.id); 
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error("Failed to delete deck:", error);
      }
    }
  };

  return (
    <div className="card">
      <h2>{deck.name}</h2>
      <span>{deck.cards.length} cards</span>
      <p>{deck.description}</p>
      <Link to={`/decks/${deck.id}`} className="btn btn-secondary">View</Link>
      <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
      <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Deck;

