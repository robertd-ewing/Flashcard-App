import React, { useEffect, useState } from 'react';
import CardForm from './CardForm';
import { useParams } from 'react-router-dom';
import { readCard, readDeck, updateCard } from '../utils/api';
import BreadCrumb from '../BreadCrumb';


function EditCard() {
  const { cardId } = useParams();
  const [card, setCard] = useState({ front: "", back: "" });
  const [deck, setDeck] = useState({ name: "" });

  useEffect(() => {
    const abortController = new AbortController();
    readCard(cardId, abortController.signal)
      .then((card) => {
        setCard(card);
        return readDeck(card.deckId, abortController.signal); // Fetch the deck only after card is fetched
      })
      .then(setDeck)
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.error("Error reading card or deck:", error);
        }
      });

    return () => abortController.abort();
  }, [cardId]);

  const handleSubmit = async (card) => {
    await updateCard(card);
  }

  return (
    <div>
      <BreadCrumb />
      <h2>{deck.name}: Edit Card</h2>
      <CardForm card={card} submitCard={handleSubmit} routeTo={`/decks/${card.deckId}`} />
    </div>
  );
}

export default EditCard;


