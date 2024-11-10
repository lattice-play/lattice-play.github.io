import { useState } from "react";
import "../css/Home.css";
import Pane from "../components/Pane.jsx";
import Navbar from "../components/Navbar.jsx";

export default function Home({ connectWallet, userData }) {
    return (
        <div className="home-wrapper">
            <main className="hero-wrapper">
                <Navbar connectWallet={connectWallet} />
                { /* <nav className="navbar">
                    <div className="nav-left">
                        <h1 className="logo">LATTICE PLAY</h1>
                    </div>
                    <div className="nav-right">
                        <a className="nav-link">Marketplace</a>
                        <a className="nav-link">Library</a>
                        <a className="nav-link">Friends</a>
                        <a className="nav-link" onClick={connectWallet}>
                            Sign in
                        </a>
                    </div>
                </nav> */}
                <section className="hero">
                    <div className="panes-wrapper">
                        <Pane
                            image="/ttt.jpg"
                            header="Last Played"
                            info="Continue playing tic tac toe"
                            type="standard"
                            color="var(--main-blue)"
                            to="/TTT"
                        />
                        <Pane
                            image=""
                            header="Offers"
                            info="Pending offers from slimjimcammy, nitzb, iamadog, and 2 more..."
                            type="words"
                            color="#0000FF"
                            to="/offers"
                        />
                        <div className="panes-bottom-left">
                            <Pane
                                image="/group.svg"
                                header="Friends"
                                info="You have 3 friends online"
                                type="image"
                                color="#0000FF"
                                to="/T"
                            />
                            <Pane
                                image="/games.jpg"
                                header="Store"
                                info=""
                                type="standard"
                                color="var(--pane-blue)"
                                to="/"
                            />
                        </div>

                        <Pane
                            image="/coin.jpg"
                            header="Explore"
                            info="Head or Tails"
                            type="standard"
                            color="var(--light-blue)"
                            to="/CoinFlip"
                        />
                    </div>
                </section>
            </main>
        </div>
    );
}
