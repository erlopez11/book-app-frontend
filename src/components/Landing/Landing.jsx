import { useNavigate } from "react-router";
const Landing = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/sign-up");
  };
  return (
    <main>
      <h1>Welcome to Bookly!</h1>
      <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl">
        Discover, search, and collect your favorite books.
      </p>

      <button onClick={handleStartClick}>Start your reading journey!</button>
    </main>
  );
};

export default Landing;
