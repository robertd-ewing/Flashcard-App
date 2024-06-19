import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listDecks, createDeck } from '../utils/api'; 

function CreateDeck() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deckId, setDeckId] = useState(0); 
  const navigate = useNavigate();

  useEffect(() => {
    const getDecks = async () => {
      const decks = await listDecks();
      const highestId = decks.reduce((maxId, deck) => Math.max(maxId, deck.id), 0);
      setDeckId(highestId + 1);
    };
    getDecks();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDeck = {
      id: deckId, 
      name,
      description,
    };
    await createDeck(newDeck);
    setName('');
    setDescription('');
    navigate(`/decks/${deckId}`); 
  };

  return (
    <div>
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <textarea
            id="name"
            name="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default CreateDeck;

