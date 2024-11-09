import { useState } from "react";
import "../css/Home.css";
import Pane from "../components/Pane.jsx";

export default function Home() {
    return (
        <div className="home-wrapper">
            <main className="hero-wrapper">
                <nav className="navbar">
                    <div className="nav-left">
                        <h1 className="logo">LATTICE PLAY</h1>
                    </div>
                    <div className="nav-right">
                        <a className="nav-link">Marketplace</a>
                        <a className="nav-link">Library</a>
                        <a className="nav-link">Friends</a>
                    </div>
                </nav>
                <section className="hero">
                    <div className="panes-wrapper">
                        <Pane
                            image="/ttt.jpg"
                            header="Last Played"
                            info="Continue playing tic tac toe"
                            type="standard"
                            color="var(--main-blue)"
                        />
                        <Pane
                            image=""
                            header="Offers"
                            info=""
                            type="bold"
                            color="#0000FF"
                        />
                        <div className="panes-bottom-left">
                            <Pane
                                image=""
                                header="Friends"
                                info=""
                                type="bold"
                                color="var(--light-blue)"
                            />
                            <Pane
                                image=""
                                header="Tic Tac Toe"
                                info="test"
                                type="standard"
                                color="var(--pane-blue)"
                            />
                        </div>

                        <Pane
                            image=""
                            header="Friends"
                            info=""
                            type="bold"
                            color="#0000FF"
                        />
                    </div>
                </section>
            </main>
        </div>
    );
}
