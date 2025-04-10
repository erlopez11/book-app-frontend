import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import "./NavBar.css";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    navigate(`/?q=${searchQuery}`);
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <h1>Bookly</h1>
        </Link>
      </div>
      <ul className="navbar-links">
        {user ? (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/collections">Collections</Link>
            </li>
            <li>
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="icon-button">
                  <img
                    src="/img/icons/magnifying-glass-solid.svg"
                    alt="Search"
                    className="search-icon"
                  />
                </button>
              </form>
            </li>
            <li className="user-item">
              {/* TODO: any action on this icon? */}
              <img
                src="/img/icons/user-solid.svg"
                alt="User"
                className="user-icon"
              />
            </li>
            <li>
              <Link to="/" onClick={handleSignOut}>
                Log Out
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/sign-in">Sign In</Link>
            </li>
            <li>
              <Link to="/sign-up">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
