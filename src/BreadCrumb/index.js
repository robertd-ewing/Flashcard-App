import { useEffect, useState } from "react";
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
        if (deck) {
            const pathnames = location.pathname.split('/').filter((x) => x && x !== 'decks');
            const crumbList = pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;
                return (
                    <li key={to} className={`breadcrumb-item ${isLast ? 'active' : ''}`} aria-current={isLast ? 'page' : undefined}>
                        {isLast ? (
                            value === deckId ? deck.name : value
                        ) : (
                            <Link to={to}>{value === deckId ? deck.name : value}</Link>
                        )}
                    </li>
                );
            });
            setBreadcrumbs(crumbList);
        }
    }, [deck, location.pathname, deckId]);

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


