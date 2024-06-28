import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import StudyCards from "./StudyCards";
import NotEnoughCards from "../Cards/NotEnoughCards";


function Study() {

  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);


  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    loadDeck();
  }, [deckId]);


  
  if (!deck) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>Study:</h2>  <span>{deck.name}</span>
      {deck.cards.length < 3 ? (
        <NotEnoughCards deck={deck} />
      ) : (
        <StudyCards cards={deck.cards} />
      )}
    </>
  );
}

export default Study;





