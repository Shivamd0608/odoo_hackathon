import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../components/AdminLogin.css'; // Reuse same CSS

const UserLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(username, password);

    if (data.success) {
      setTimeout(() => navigate("/user-dashboard"), 100); 
    } else {
      setMessage(data.message);
    }
  };

  return (
    <section className="container">
      <div className="login-container">
        <div className="circle circle-one"></div>
        <div className="form-container">
          <img
            src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
            alt="illustration"
            className="illustration"
          />
          <h2 className="opacity" style={{ color: "black" }}>Login As User</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="USERNAME"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="PASSWORD"
              required
            />
            <button className="opacity" type="submit">
              SUBMIT
            </button>
          </form>
        </div>
        <div className="circle circle-two"></div>
      </div>

      {message && <p className="message">{message}</p>}
    </section>
  );
};

export default UserLoginPage;
