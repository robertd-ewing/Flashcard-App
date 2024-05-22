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

  return (
    <div>
      <h2>Study: {deck && deck.name}</h2>
      {deck && <Deck deck={deck} />}
      <button type="button" className="btn btn-secondary">Flip</button>
    </div>
  );
}

export default Study;



