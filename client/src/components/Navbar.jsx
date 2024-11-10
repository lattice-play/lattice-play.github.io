export default function Navbar({ connectWallet, userData }) {
    return (
        <nav className="navbar">
            <div className="nav-left">
                <h1 className="logo">LATTICE PLAY</h1>
            </div>
            <div className="nav-right">
                <a className="nav-link">Marketplace</a>
                <a className="nav-link">Library</a>
                <a className="nav-link">Friends</a>
                {!userData && (
                    <a className="nav-link" onClick={connectWallet}>
                        Sign in
                    </a>
                )}
            </div>
        </nav>
    );
}
