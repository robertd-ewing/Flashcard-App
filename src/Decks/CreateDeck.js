import React, { useState } from "react";
import { createDeck } from "../utils/api";
import DeckForm from "./DeckForm";
import BreadCrumb from "../BreadCrumb";

function CreateDeck({ addDeck }) {
  const [formData] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = async (formData) => {
    const newDeck = await createDeck(formData);
    addDeck(newDeck);
  };

  let routeTo = "/";

  return (
    <div>
      <BreadCrumb />
      <h2>Create Deck</h2>

      <DeckForm deck={formData} submitDeck={handleSubmit} routeTo={routeTo} />
    </div>
  );
}

export default CreateDeck;
