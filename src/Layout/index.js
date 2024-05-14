import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { listDecks } from "../utils/api";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Decks from "../decks";

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
        <Routes>
          <Route exact path="/" element={<Decks decks={decks} />}>
            
          </Route>
        </Routes>
        
        
      
    <NotFound />
    </div>
    </>
  );
}

export default Layout;
