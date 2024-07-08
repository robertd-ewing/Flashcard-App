import React from 'react';
import Deck from "./deck";

function Decks({ decks }) {
  return (
    <>
      {decks.map((deck) => (
        <Deck key={deck.id} deck={deck}  />
      ))}
    </>
  );
}

export default Decks;