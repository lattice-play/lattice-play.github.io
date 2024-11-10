import { useState } from "react";
import "../css/Offers.css";
import Navbar from "../components/Navbar.jsx";
import Pane from "../components/Pane.jsx";
import { openContractCall, UserSession } from "@stacks/connect";
import { fetchCallReadOnlyFunction, standardPrincipalCV, stringUtf8CV, uintCV } from "@stacks/transactions";

export default function Offers({ connectWallet, userData }) {
    const [offers, setOffers] = useState([
        {
            bid: {
                bidder: "slimjimcammy",
                offer: "Golden Heart",
                contract: "contracts_ttt_clar",
                address: "ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC", // temporarily hard coded
                token_id: 2, // temporarily hard coded
                img: "/heart.png",
            },
            ask: {
                item: "Blue Coin",
                game: "Coin Flip",
                contract: "contracts_dino_clar",
                token_id: 2, // temporarily hard coded
                img: "/coin.webp",
            },
        },
        {
            bid: {
                bidder: "iamadog",
                offer: "Silver Slash",
                game: "Tic Tac Toe",
                contract: "contracts_ttt_clar",
                address: "ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC",
                token_id: 2, // temporarily hard coded
                img: "/x.png",
            },
            ask: {
                item: "Blue Coin",
                game: "Coin Flip",
                contract: "contracts_dino_clar",
                token_id: 2, // temporarily hard coded
                img: "/coin.webp",
            },
        },
    ]);

    async function trade(index) {
        // must check to see if the offer can be removed first
        const o = offers[index];
        const network = "devnet";
        const userSession = new UserSession({ network });
        const userData = await userSession.loadUserData();
        const userAddress = userData.profile.stxAddress.testnet; // Get the user's address
        const bidderAddress = o.bid.address;
    
        // Get the last token ID (this is the highest minted token ID)
        const contractAddress = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"; // Replace with your contract address
        const contractName = o.bid.contract; // Replace with your contract name
        const functionName = "transfer";
        const my_new_token = o.bid.token_id;
        const their_new_token = o.ask.token_id;

        const options_get = {
            contractAddress,
            contractName,
            functionName,
            functionArgs: [uintCV(my_new_token), standardPrincipalCV(bidderAddress), standardPrincipalCV(userAddress)],
            network,
            senderAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
        };
        const options_give = {
            contractAddress,
            contractName,
            functionName,
            functionArgs: [uintCV(their_new_token), standardPrincipalCV(userAddress), standardPrincipalCV(bidderAddress)],
            network,
            senderAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
        }
        try {
            openContractCall(options_get);
            openContractCall(options_give);
        } catch (error) {
            console.log("error occured while trading: ", error);
        }
        removeOffer(index);
    }

    function removeOffer(index) {
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
                                    <button
                                        className="offer-accept"
                                        onClick={async () => await trade(i)}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="offer-reject"
                                        onClick={() => removeOffer(i)}
                                    >
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
