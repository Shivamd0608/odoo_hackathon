// src/components/UserRegistrationPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'userregisttration.css'; // Reusing the same CSS for consistent styling

const UserRegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage(""); // Clear previous messages

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      if (response.data.success) {
        setMessage("Registration successful! Redirecting to login...");
        // Optionally, you might want to automatically log them in or redirect to a success page
        setTimeout(() => navigate("/login"), 1500); // Redirect to user login after success
      } else {
        setMessage(response.data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Server not responding or registration failed. Please try again later."
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
          <h2>Register New User</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="FULL NAME"
              required
              disabled={loading}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL"
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
            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "REGISTER"}
            </button>
          </form>
        </div>
        <div className="circle circle-two"></div>
      </div>

      {message && <p className="message">{message}</p>}
    </section>
  );
};

export default UserRegistrationPage;
