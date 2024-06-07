import React, { useState } from 'react';



CreateDeck() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
}

const handleSubmit = async (event) => {
    event.preventDefault();
    const newDeck = {
      name,
      description,
    };
    await createDeck(deckId, newDeck);
    setName('');
    setDescription('');
  };