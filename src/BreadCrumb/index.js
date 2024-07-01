import { useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

function BreadCrumb() {
    let { pathname } = useLocation();
    let { deckId } = useParams(); 
    let [deck, setDeck] = useState(null);
    let [crumbs, setCrumbs] = useState([]);
    let [breadcrumbs, setBreadCrumbs] = useState([]);

    useEffect(() => {
        setCrumbs(pathname.split('/'));
    }, [pathname]);

    useEffect(() => {
        async function loadDeck() {
            if (crumbs.length > 2) {
                const result = await readDeck(deckId);
                setDeck(result);
            }
        }

        loadDeck();
    }, [deckId, crumbs]);

    useEffect(() => {
        if (deck) {
            setBreadCrumbs(["Home", deck.name, "Study"]);
        }
    }, [deck]);

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    {breadcrumbs[1] && (
                        <li className="breadcrumb-item">
                            <Link to={`/decks/${deckId}`}>{breadcrumbs[1]}</Link>
                        </li>
                    )}
                    {breadcrumbs[2] && (
                        <li className="breadcrumb-item active" aria-current="page">
                            {breadcrumbs[2]}
                        </li>
                    )}
                </ol>
            </nav>
        </>
    );
}

export default BreadCrumb;
