import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { readDeck, createCard, deleteDeck } from "../utils/api";
import { Link } from 'react-router-dom';

function View() {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const [deck, setDeck] = useState(null);
    const [showAddCardForm, setShowAddCardForm] = useState(false);
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');

    useEffect(() => {
        async function loadDeck() {
            const deckData = await readDeck(deckId);
            setDeck(deckData);
        }

        loadDeck();
    }, [deckId]);

    const handleCardAdded = (newCard) => {
        setDeck((prevDeck) => ({
            ...prevDeck,
            cards: [...prevDeck.cards, newCard],
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newCard = { front, back };
        await createCard(deckId, newCard);
        handleCardAdded(newCard);
        setFront('');
        setBack('');
        setShowAddCardForm(false);
    };

    const handleDelete = async () => {
        if (window.confirm("Delete this deck? You will not be able to recover it.")) {
            await deleteDeck(deckId);
            navigate('/');
        }
    };

    if (deck) {
        return (
            <div>
                <h2>{deck.name}</h2>
                <h4>{deck.description}</h4>
                <div>
                    <p>Total Cards: {deck.cards.length}</p>
                    <button type="button" className="btn btn-secondary">Edit</button>
                    <Link to={`/decks/${deckId}/study`} className="btn btn-primary">Study</Link>
                    <button type="button" className="btn btn-primary" onClick={() => setShowAddCardForm(true)}>Add Cards</button>
                    <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
                {showAddCardForm && (
                    <div>
                        <h2>Add Card to {deck.name}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="front">Front</label>
                                <input
                                    type="text"
                                    id="front"
                                    name="front"
                                    className="form-control"
                                    value={front}
                                    onChange={(e) => setFront(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="back">Back</label>
                                <input
                                    type="text"
                                    id="back"
                                    name="back"
                                    className="form-control"
                                    value={back}
                                    onChange={(e) => setBack(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                )}
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
}

export default View;

