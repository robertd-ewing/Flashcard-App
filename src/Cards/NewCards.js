import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";



function NewCards() {
  let { deckId } = useParams();
  const [deck, setDeck] = useState("");
  const initialFormState = { front: "", back: "" };
  const [formData, setFormData] = useState(initialFormState);


  useEffect(() => {
    const loadDeck = async () => {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    loadDeck();

  }, [deckId]);


  function handleSubmit(card) {
    createCard(deckId, card);
    setFormData(initialFormState);
  }

  return (
    <>
      <h2><span>{deck.name}</span>:Add Card</h2> 

      <CardForm formData={formData} submitCard={handleSubmit} routeTo={`/decks/${deckId}`} />
    </>
  );
}


export default NewCards;


