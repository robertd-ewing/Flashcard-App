import React, { useEffect, useState } from "react";
import { listDecks } from "../utils/api";
import Decks from "../decks";
import { useNavigate } from 'react-router-dom';

function Home() {
  const [decks, setDecks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadDecks() {
      const response = await listDecks();
      setDecks(response);
    }

    loadDecks(); 
  }, []);

  return (
    <div>
      <button type="button" className="btn btn-secondary" onClick={() => navigate('/decks/new')}>Create Deck</button>
      <h2>Decks</h2>
      <Decks decks={decks} />
      
    </div>
  );
}

export default Home;

