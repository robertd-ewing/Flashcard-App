import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import StudyCards from "./StudyCards";
import NotEnoughCards from "../Cards/NotEnoughCards";
import BreadCrumb from "../BreadCrumb";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState();

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
    <div>
      <BreadCrumb />
      <h2>
        <span>{deck.name}</span>:Study
      </h2>
      {deck.cards.length < 3 ? (
        <NotEnoughCards deck={deck} />
      ) : (
        <StudyCards cards={deck.cards} />
      )}
    </div>
  );
}

export default Study;
