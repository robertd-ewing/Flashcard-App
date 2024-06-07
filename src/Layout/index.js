import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home";
import Study from "../Study";
import View from "../View";
import NewCards from "../Cards/NewCards";


function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="decks/:deckId/study" element={<Study />} />
          <Route path="decks/:deckId" element={<View />} />
          <Route path="decks/:deckId/cards/new" element={<NewCards />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default Layout;
