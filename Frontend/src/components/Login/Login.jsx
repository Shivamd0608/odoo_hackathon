import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../components/AdminLogin.css'; // Your CSS

const UserLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      if (response.data.success) {
        // ✅ Optional: store token or user info
        // localStorage.setItem("token", response.data.token);

        // ✅ Clear form
        setUsername("");
        setPassword("");

        // ✅ Navigate after a small delay
        setTimeout(() => navigate("/user-dashboard"), 100);
      } else {
        setMessage(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Server not responding. Please try again later."
      );
    } finally {
      setLoading(false);
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
              disabled={loading}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="PASSWORD"
              required
              disabled={loading}
            />
            <button className="opacity" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "SUBMIT"}
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
