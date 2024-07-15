import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function Deck({ deck, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (
      window.confirm("Delete this deck? You will not be able to recover it.")
    ) {
      try {
        await deleteDeck(deck.id);
        if (onDelete) {
          onDelete(deck.id);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Failed to delete deck:", error);
      }
    }
  };

  return (
    <div className="card">
      <div className="home-card">
        <h4>{deck.name}</h4>
        <span className="home-cards">{deck.cards.length} cards</span>
        <h5>{deck.description}</h5>
        <div className="home-buttons">
          <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
            View
          </Link>
          <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
            Study
          </Link>
          <div className="home-delete">
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deck;
