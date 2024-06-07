import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { readDeck, createCard } from '../utils/api';

function NewCards() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  useEffect(() => {
    async function loadDeck() {
      const deckData = await readDeck(deckId);
      setDeck(deckData);
    }

    loadDeck();
  }, [deckId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newCard = {
      front,
      back,
    };
    await createCard(deckId, newCard);
    // Optionally, reset the form or navigate away
    setFront('');
    setBack('');
  };

  if (!deck) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Add Card to {deck.name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <input
            type="text"
            id="front"
            name="front"
            className="form-control"
            value={front}
            onChange={(e) => setFront(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <input
            type="text"
            id="back"
            name="back"
            className="form-control"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            required
          />
        </div>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Done</button>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}

export default NewCards;


