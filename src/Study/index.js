import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import Deck from "../decks/deck";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    async function loadDeck() {
      const deckData = await readDeck(deckId);
      setDeck(deckData);
    }

    loadDeck();
  }, [deckId]);
 if(!deck) {
  return <div>Loading...</div>
 }
  return (
    <div>
      <h2>Study:  {deck.name}</h2>
      {deck.cards.map((card) => (
        <>
          <p>Card {card.id} of {deck.cards.length}</p>
          <p>{card.front}</p>
          <button type="button" className="btn btn-secondary">Flip</button>
        </>
      ))}
    </div>
  );
}

export default Study;



