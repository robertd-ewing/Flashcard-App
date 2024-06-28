import React, { useState } from 'react';

function StudyCards({ cards }) {
  const [cardNumber, setCardNumber] = useState(1);
  const [flipped, setFlipped] = useState(false);

  function flipCard() {
    setFlipped(!flipped);
  }

  function next() {
    if (cardNumber === cards.length) {
      if (window.confirm("Restart cards?")) {
        setCardNumber(1);
      }
    } else {
      setCardNumber(cardNumber + 1);
    }
    setFlipped(false);
  }

  return (
    <section className="card">
      {cards && (
        <>
          <h3>Card {cardNumber} of {cards.length}</h3>
          <p>{flipped ? cards[cardNumber - 1].back : cards[cardNumber - 1].front}</p>
        </>
      )}
      <button className="btn bg-secondary" onClick={flipCard}>Flip</button>
      {flipped && <button className="btn bg-primary" onClick={next}>Next</button>}
    </section>
  );
}

export default StudyCards;