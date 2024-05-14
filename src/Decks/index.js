import React, { useEffect, useState } from "react";
import Deck from "./deck";


function Decks({decks}) {
  
  return (
    <>
      {decks.map((deck) => (
          <Deck deck={deck} />
        ))}
    </>
  );
}

export default Decks;
