import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { readDeck, updateDeck } from '../utils/api'; 

function EditDeck() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const { deckId } = useParams();
    const navigate = useNavigate();
    const [deck, setDeck] = useState(null);

    useEffect(() => {
        async function loadDeck() {
            const deckData = await readDeck(deckId);
            setDeck(deckData);
        }

        loadDeck();
    }, [deckId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedDeck = {
      id: deckId, 
      name,
      description,
    };
    await updateDeck(updatedDeck);
    setName('');
    setDescription('');
    navigate(`/decks/${deckId}`); 
  };

  return (
    <div>
      <h2>Edit Deck</h2>
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
        <button type="button" className="btn btn-secondary" onClick={() => navigate(`/decks/${deckId}`)}>Cancel</button>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default EditDeck;