import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { listDecks } from "../utils/api";
import { BrowserRouter as Router, Link } from "react-router-dom";

function Layout() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function loadDecks() {
      const response = await listDecks();
      setDecks(response);
    }

    loadDecks();
  }, []);
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}

        <button>Create Deck</button>

        {decks.map((deck) => (
          <div className="card">
            <h2>{deck.name}</h2>
            <span>{deck.cards.length} cards</span>

            <p>{deck.description}</p>

            <Link to={`/decks/${deck.id}`} className="btn btn-secondary">View</Link>
            <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
            <button type="button" class="btn btn-danger">Delete</button>
          </div>
        ))}
      
    <NotFound />
    </div>
    </>
  );
}

export default Layout;
