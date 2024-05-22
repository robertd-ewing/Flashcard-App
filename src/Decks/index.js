import React from "react";
import Deck from "./deck";

function Decks({ decks }) {
  return (
    <>
      {decks.map((deck) => (
        <Deck deck={deck} key={deck.id} />
      ))}
    </>
  );
}

export default Decks;

