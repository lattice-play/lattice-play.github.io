export default function Navbar({ connectWallet, userData }) {
    return (
        <nav className="navbar">
            <div className="nav-left">
                <a className="logo" href="/">LATTICE</a>
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
