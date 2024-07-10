import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home";
import Study from "../Study";
import View from "../View";
import NewCards from "../Cards/NewCards";
import CreateDeck from "../Decks/CreateDeck";
import EditCard from "../Cards/EditCard";
import EditDeck from "../Decks/EditDeck";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="decks/:deckId/study" element={<Study />} />
          <Route path="decks/:deckId" element={<View />} />
          <Route path="decks/new" element={<CreateDeck />} />
          <Route path="decks/:deckId/edit" element={<EditDeck />} />
          <Route path="decks/:deckId/cards/new" element={<NewCards />} />
          <Route
            path="/decks/:deckId/cards/:cardId/edit"
            element={<EditCard />}
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default Layout;
