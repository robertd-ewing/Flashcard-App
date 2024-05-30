import  { useEffect, useState } from "react";
import { listDecks } from "../utils/api";
import Decks from "../decks";

function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function loadDecks() {
      const response = await listDecks();
      setDecks(response);
    }

    loadDecks(); 
  }, []);

  return (
    <div>
      <h2>Decks</h2>
      <Decks decks={decks} />
    </div>
  );
}

export default Home;

