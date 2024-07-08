import React, { useState } from "react";
import { createDeck } from "../utils/api";
import DeckForm from "./DeckForm";
import BreadCrumb from "../BreadCrumb";



function CreateDeck({ addDeck }) {
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  const handleSubmit = async (formData) => {
    const newDeck = await createDeck(formData);
    addDeck(newDeck);
  };


  let routeTo = "/";

  return (
    <>
      <BreadCrumb />
      <h2>Create Deck</h2>

      <DeckForm deck={formData} submitDeck={handleSubmit} routeTo={routeTo} />
    </>

  );
}

export default CreateDeck;

