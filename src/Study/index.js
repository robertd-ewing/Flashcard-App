import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { readDeck, createCard } from '../utils/api';

function Study() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  useEffect(() => {
    async function loadDeck() {
      const deckData = await readDeck(deckId);
      setDeck(deckData);
    }

    loadDeck();
  }, [deckId]);

  const handleCardAdded = (newCard) => {
    setDeck((prevDeck) => ({
      ...prevDeck,
      cards: [...prevDeck.cards, newCard],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newCard = {
      front,
      back,
    };
    await createCard(deckId, newCard);
    handleCardAdded(newCard);
    setFront('');
    setBack('');
    setShowAddCardForm(false);
  };

  if (!deck) {
    return <div>Loading...</div>;
  }

  if (deck.cards.length < 3 && !showAddCardForm) {
    return (
      <div>
        <h2>Study: {deck.name}</h2>
        <div>
          <p>This deck does not have enough cards to study. Please add more cards to the deck.</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowAddCardForm(true)}
          >
            Add Cards
          </button>
        </div>
      </div>
    );
  }

  const currentCard = deck.cards[currentCardIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      if (window.confirm("You have reached the end of the deck. Do you want to restart?")) {
        setCurrentCardIndex(0);
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div>
      <h2>Study: {deck.name}</h2>
      {showAddCardForm ? (
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
            <button type="submit" className="btn btn-primary">Save</button>
          </form>
        </div>
      ) : (
        <div>
          <p>Card {currentCardIndex + 1} of {deck.cards.length}</p>
          <p>{isFlipped ? currentCard.back : currentCard.front}</p>
          <button type="button" className="btn btn-secondary" onClick={handleFlip}>
            Flip
          </button>
          {isFlipped && (
            <button type="button" className="btn btn-primary" onClick={handleNext}>
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Study;





