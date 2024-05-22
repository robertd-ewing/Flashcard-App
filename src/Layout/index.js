import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Routes, Route } from "react-router-dom";
import Home from "../Home";
import Study from "../Study";

function Layout() {

  return (
    <>
      <Header />
      <div className="container">
       
        <button>Create Deck</button>
        
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path ="decks/:deckId/study" element={<Study />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        
        
        
      
    <NotFound />
    </div>
    </>
  );
}

export default Layout;
