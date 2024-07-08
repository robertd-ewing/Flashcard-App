import React, { useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

function BreadCrumb() {
    const location = useLocation();
    const { deckId } = useParams(); 
    const [deck, setDeck] = useState(null);
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(() => {
        async function loadDeck() {
            if (deckId) {
                const result = await readDeck(deckId);
                setDeck(result);
            }
        }

        loadDeck();
    }, [deckId]);

    useEffect(() => {
        const pathnames = location.pathname.split('/').filter((x) => x && x !== 'decks');
        const crumbList = pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            return (
                <li key={to} className={`breadcrumb-item ${isLast ? 'active' : ''}`} aria-current={isLast ? 'page' : undefined}>
                    {isLast ? (
                        value === deckId ? (deck ? capitalize(deck.name) : 'Loading...') : capitalize(value)
                    ) : (
                        <Link to={value === deckId ? `/decks/${deckId}` : to}>{value === deckId ? (deck ? capitalize(deck.name) : 'Loading...') : capitalize(value)}</Link>
                    )}
                </li>
            );
        });
        setBreadcrumbs(crumbList);
    }, [deck, location.pathname, deckId]);

    const capitalize = (s) => {
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                {breadcrumbs}
            </ol>
        </nav>
    );
}

export default BreadCrumb;




