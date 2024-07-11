import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api";

function View() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    async function loadDeck() {
      const deckData = await readDeck(deckId);
      setDeck(deckData);
    }

    loadDeck();
  }, [deckId]);

  const handleDelete = async () => {
    if (
      window.confirm("Delete this deck? You will not be able to recover it.")
    ) {
      await deleteDeck(deckId);
      navigate("/");
    }
  };

  if (deck) {
    return (
      <div>
        <div className="deck container">
          <h4>{deck.name}</h4>
          <h5>{deck.description}</h5>
          <div className="button-container">
            <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">
              Edit
            </Link>
            <Link to={`/decks/${deckId}/study`} className="btn btn-primary">
              Study
            </Link>
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
              Add Cards
            </Link>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
          <h3>Cards</h3>

          {deck.cards.map((card) => (
            <section key={card.id}>
              <div className="card">
                <div className="card-content">
                  <span className="card-front">{card.front}</span>
                  <span className="card-back">
                    {card.back}{" "}
                    <div className="card-buttons">
                      <Link
                        to={`/decks/${deckId}/cards/${card.id}/edit`}
                        className="btn btn-secondary"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </div>
                  </span>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default View;
