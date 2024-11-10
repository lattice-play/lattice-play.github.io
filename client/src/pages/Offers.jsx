import { useState } from "react";
import "../css/Offers.css";
import Navbar from "../components/Navbar.jsx";
import Pane from "../components/Pane.jsx";

export default function Offers({ connectWallet, userData }) {
    const [offers, setOffers] = useState([
        {
            bid: {
                bidder: "slimjimcammy",
                offer: "Golden Heart",
                game: "Tic Tac Toe",
                img: "/heart.png",
            },
            ask: {
                item: "Blue Coin",
                game: "Coin Flip",
                img: "/coin.webp",
            },
        },
        {
            bid: {
                bidder: "iamadog",
                offer: "Silver Slash",
                game: "Tic Tac Toe",
                img: "/x.png",
            },
            ask: {
                item: "Blue Coin",
                game: "Coin Flip",
                img: "/coin.webp",
            },
        },
    ]);

    function removeOffer(index) {
        // should do after NFT is successfully created
        setOffers((prevOffers) => prevOffers.filter((_, i) => i !== index));
    }

    return (
        <div className="offers-page-wrapper">
            <div className="offers-wrapper">
                <Navbar connectWallet={connectWallet} userData={userData} />
                <h1 className="offers-pending-header">Pending Trades</h1>
                <div className="offers">
                    {offers.map((o, i) => {
                        return (
                            <div className="offer">
                                <Pane
                                    image={o.bid.img}
                                    header={`You get`}
                                    info={`${o.bid.offer} from ${o.bid.game}`}
                                    type="image"
                                    color="#0000FF"
                                    to="/"
                                />
                                <div className="offer-buttons">
                                    <button className="offer-accept">
                                        Accept
                                    </button>
                                    <button className="offer-reject">
                                        Reject
                                    </button>
                                </div>
                                <Pane
                                    image={o.ask.img}
                                    header={`${o.bid.bidder} gets`}
                                    info={`${o.ask.item} from ${o.ask.game}`}
                                    type="image"
                                    color="#0000FF"
                                    to="/"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
