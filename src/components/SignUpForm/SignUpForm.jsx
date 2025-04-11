import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../../services/authService";
import { UserContext } from "../../contexts/UserContext";
import "./SignUpForm.css"; // ← new!

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConf: "",
  });

  const { username, password, passwordConf } = formData;

  const handleChange = (event) => {
    setMessage("");
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newUser = await signUp(formData);
      setUser(newUser);
      navigate("/");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <h1>Join Bookly</h1>
        <p>Create an account to start organizing your personal bookshelf.</p>
        {message && <p style={{ color: "red" }}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              name="username"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="passwordConf">Confirm Password:</label>
            <input
              type="password"
              id="passwordConf"
              value={passwordConf}
              name="passwordConf"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={isFormInvalid()}>
            Sign Up
          </button>
        </form>
        <div className="signup-footer">
          Already a member?{" "}
          <a onClick={() => navigate("/sign-in")}>Log in here!</a>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
