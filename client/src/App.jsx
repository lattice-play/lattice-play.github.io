import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import TTT from "./games/TTT.jsx";
import CoinFlip from "./games/CoinFlip.jsx";
import Offers from "./pages/Offers.jsx";
import { AppConfig, UserSession, showConnect } from "@stacks/connect";

export default function App() {
    const [userData, setUserData] = useState(undefined);
    const appConfig = new AppConfig(["store_write"]);
    const userSession = new UserSession({ appConfig });
    const appDetails = {
        name: "Lattice",
    };

    function connectWallet() {
        showConnect({
            appDetails,
            onFinish: () => window.location.reload(),
            userSession,
        });
    }

    useEffect(() => {
        if (userSession.isSignInPending()) {
            console.log("sign in pending");

            userSession.handlePendingSignIn().then((userData) => {
                setUserData(userData);
            });
        } else if (userSession.isUserSignedIn()) {
            setUserData(userSession.loadUserData());
        } else {
            console.log("hit nothing");
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/TTT" element={<TTT />} />
                <Route path="/coinflip" element={<CoinFlip />} />
                <Route path="/offers" element={<Offers />} />
            </Routes>
        </BrowserRouter>
    );
}
