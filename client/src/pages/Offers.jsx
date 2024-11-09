import "../css/Offers.css";

export default function Offers() {
    let offers = [
        {
            from: "slimjimcammy",
            toYou: "Golden Heart",
            fromYou: "Blue Coin",
        },
        {
            from: "iamadog",
            toYou: "Silver Slash",
            fromYou: "Blue Coin",
        },
    ];

    return (
        <div className="offers-page-wrapper">
            <h1 className="offers-header">Offers</h1>
            <div className="offers-wrapper">
                <h1 className="offers-pending-header">Pending Trades</h1>
                <div className="offers">
                    {offers.map((o, i) => {
                        return (
                            <div className="offer">
                                <h1 className="offering-party">{o.from}</h1>
                                <p className="offer-item">Wants: {o.fromYou}</p>
                                <p className="offer-item">For: {o.toYou}</p>
                                <div className="offer-buttons">
                                    <button className="offer-accept">
                                        Accept
                                    </button>
                                    <button className="offer-reject">
                                        Reject
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
