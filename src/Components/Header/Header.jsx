import './Header.css';
function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <h1 className="logo">PUBLIC SAPIENTS</h1>
        <div className="home-button" onClick={() => window.location.href = '/'}>
          Home
        </div>
      </nav>
    </header>
  );
}

export default Header;
