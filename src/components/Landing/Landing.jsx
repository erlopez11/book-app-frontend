import { useNavigate } from "react-router";
import "./Landing.css";
import booklyDash from "../../assets/booklyDash.png";
const Landing = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/sign-up");
  };
  return (
    <main className="landing-container">
      <div className="landing-content">
        <div className="landing-text">
          <h1>Hello, reader!</h1>
          <p>
            Welcome to Bookly, your personalized digital bookshelf. Discover
            books, track your progress, and build your collection.
          </p>
          <button className="cta-button" onClick={handleStartClick}>
            Start your reading journey!
          </button>
        </div>
        <div className="landing-image">
          <img src={booklyDash} alt="Bookly dashboard" />
        </div>
      </div>
    </main>
  );
};

export default Landing;
