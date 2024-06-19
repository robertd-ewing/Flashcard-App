import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { readDeck, readCard, updateCard } from '../utils/api';

function EditCard() {
  const { deckId, cardId } = useParams(); 
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  useEffect(() => {
    async function loadDeckAndCard() {
      try {
        const deckData = await readDeck(deckId);
        setDeck(deckData);
        const cardData = await readCard(deckId, cardId); 
        setFront(cardData.front);
        setBack(cardData.back);
      } catch (error) {
        console.error("Failed to load deck or card:", error);

      }
    }

    loadDeckAndCard();
  }, [deckId, cardId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedCard = {
      id: cardId, 
      deckId,
      front,
      back,
    };

    await updateCard(updatedCard);
    navigate(`/decks/${deckId}`);
  };

  if (!deck) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Card for {deck.name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
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
          <textarea
            id="back"
            name="back"
            className="form-control"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            required
          />
        </div>
        <button type="button" className="btn btn-secondary" onClick={() => navigate(`/decks/${deckId}`)}>Cancel</button>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default EditCard;

