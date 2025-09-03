import React from "react";
import bgImage from "../../images/home_bg.jpg";
import "./registerAdmin.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar2 from '../Navbar2/Navbar2';
import AppNavbar from "../Navbar/AppNavbar";

const registerAdmin = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        role: "Admin", 
      };

      const response = await fetch("http://localhost:8080/api/registerUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const message = await response.text();
      alert(message);

      // ✅ Reset form after successful submit
      setName("");
      setUsername("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Registration failed", error);
      alert("Something went wrong. Please try again!");
    }
  };


  return (
    <>
      <header>
        <AppNavbar/>
      </header>
      <main>
        <div
          className="registerAdmin_body"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="registerAdmin_overlay"></div>
          <div className="registerAdmin_box">
            <div className="registerAdmin_head">Register</div>
            <form className="registerAdmin_form" onSubmit={handleSubmit}>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label>Username:</label>
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <label>Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label>Phone Number:</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter Phone No."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <label>Password:</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <label>Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button type="submit" className="registerAdmin_btn">
                Register
              </button>
              <Link to="/login" className="registerAdmin_login">
                Already have an account? <b className="login">Login</b>
              </Link>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default registerAdmin;
