import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { readDeck, deleteDeck } from "../utils/api";

function View() {
    const { deckId, cardId } = useParams();
    const navigate = useNavigate();
    const [deck, setDeck] = useState(null);

    useEffect(() => {
        async function loadDeck() {
            const deckData = await readDeck(deckId);
            setDeck(deckData);
        }

        loadDeck();
    }, [deckId]);

    const handleDelete = async () => {
        if (window.confirm("Delete this deck? You will not be able to recover it.")) {
            await deleteDeck(deckId);
            navigate('/');
        }
    };

    if (deck) {
        return (
            <>
                <div>
                    <h2>{deck.name}</h2>
                    <h4>{deck.description}</h4>
                    <div>
                        <p>Total Cards: {deck.cards.length}</p>
                        <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">Edit</Link>
                        <Link to={`/decks/${deckId}/study`} className="btn btn-primary">Study</Link>
                        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">Add Cards</Link>
                        <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                    </div>
                    {console.log(deck)}
                    <h3>Cards</h3>
                   
                    {deck.cards.map((card) => (
                         <section className='card'>
                            <span>{card.front}</span>
                            <span>{card.back}</span>
                            <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary">Edit</Link>
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete <i className="bi bi-trash3"></i></button>
                        </section>
                    ))}
                   
            
                </div>
            </>
            
        );
    } else {
        return <div>Loading...</div>;
    }
}

export default View;


