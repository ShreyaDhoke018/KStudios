import React, { useState } from "react";
import axios from "axios";
import bgImage from "../../images/home_bg.jpg";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!usernameInput || !passwordInput) {
      alert("Please fill in both fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/loginUser", {
        username: usernameInput,
        password: passwordInput,
      });

      // Axios automatically parses JSON into response.data
      const data = response.data;

      if (data.error) {
        alert(data.error);
        return;
      }

      // Store the returned map (username, role) in sessionStorage
      localStorage.setItem("userId", JSON.stringify(data.id))
      localStorage.setItem("uid", JSON.stringify(data.uid));
      localStorage.setItem("user", JSON.stringify(data.username)); 
      localStorage.setItem("role", JSON.stringify(data.role));
      localStorage.setItem("profile", JSON.stringify(data.profile));

      alert("Login successful!");
      navigate("/");
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.data?.error) {
        alert(error.response.data.error);
      } else {
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <div
      className="auth_body"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="auth_overlay"></div>

      <div className="auth_box">
        <div className="auth_head">Login</div>

        <form className="auth_form" onSubmit={handleLogin}>
          <label htmlFor="username">Username / Email:</label>
          <input
            id="username"
            type="text"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            required
          />

          <a href="#" className="forgot_pw">
            Forget password?
          </a>

          <button type="submit" className="auth_btn">
            Login
          </button>

          <p className="switch_link">
            Don't have an account?{" "}
            <Link to="/register" className="highlight_link">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
