import React, { useState } from "react";
import axios from "axios";
import bgImage from "../../images/home_bg.jpg";
import "./Register.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (
      !name ||
      !username ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill out all fields!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number!");
      return;
    }

    try {
      const userData = {
        name,
        username,
        email,
        phone,
        password,
        role: "USER",
        image: "/uploads/profile_image.png",
      };

      const response = await axios.post(
        "http://localhost:8080/api/registerUser",
        userData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert(response.data); // Axios automatically parses JSON/text

      // Reset form after successful submit
      setName("");
      setUsername("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Registration failed", error);
      alert(error.response?.data || "Something went wrong. Please try again!");
    }
  };

  return (
    <div
      className="register_body"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="register_overlay"></div>
      <div className="register_box">
        <div className="register_head">Register</div>
        <form className="register_form" onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Username:</label>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Phone Number:</label>
          <input
            type="text"
            placeholder="Enter Phone No."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Confirm Password:</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" className="register_btn">
            Register
          </button>
          <Link to="/login" className="register_login">
            Already have an account? <b className="login">Login</b>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
