import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { readDeck } from "../utils/api";

function Study() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    async function loadDeck() {
      const deckData = await readDeck(deckId);
      setDeck(deckData);
    }

    loadDeck();
  }, [deckId]);

  if (!deck) {
    return <div>Loading...</div>;
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
    </div>
  );
}

export default Study;




