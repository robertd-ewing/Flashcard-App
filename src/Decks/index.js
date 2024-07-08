import React from 'react';
import Deck from "./deck";

function Decks({ decks }) {
  return (
    <div>
      {decks.map((deck) => (
        <Deck key={deck.id} deck={deck}  />
      ))}
    </div>
  );
}

export default Decks;