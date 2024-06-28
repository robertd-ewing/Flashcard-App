import React from 'react';
import { Link } from 'react-router-dom';

function NotEnoughCards({ deck }) {

  function renderCardCount(count) {
    return count === 1 ? "There is 1 card" : `There are ${count} cards`;
  }

  return (
    <div>
      <h3>Not enough cards.</h3>
      <p>You need at least 3 cards to study. {renderCardCount(deck.cards.length)} in this deck.</p>
      <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">Add Cards</Link>
    </div>
  );
}

export default NotEnoughCards;