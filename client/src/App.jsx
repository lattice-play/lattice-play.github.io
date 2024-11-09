import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import TTT from "./games/TTT.jsx";
import CoinFlip from "./games/CoinFlip.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/TTT" element={<TTT />} />
            <Route path="/CoinFlip" element={<CoinFlip />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
