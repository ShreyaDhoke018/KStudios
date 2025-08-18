import React, { useState } from "react";
import profileImage from "../../images/profile_image.png";
import bgImage from "../../images/home_bg.jpg";
import "./Profile.css";
import axios from "axios";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [gmail, setGmail] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const oldUsername = localStorage.getItem("user");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Username: ", oldUsername);
    if (newPassword == confirmPassword) {
      try {
        const payload = {
          username: oldUsername, // old username
          newUsername: username || null,
          email: gmail || null,
          phone: phone || null,
          password: newPassword || null,
        };

        const response = await axios.post(
          "http://localhost:8080/api/profile",
          payload,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        alert(response.data);

        if (username) {
          localStorage.setItem("user", username);
        }

         setUsername("");
         setGmail("");
         setPhone("");
         setNewPassword("");
         setConfirmPassword("");
         
      } catch (error) {
        console.error("Registration failed", error);
        alert(
          error.response?.data || "Something went wrong. Please try again!"
        );
      }
    } else {
      alert("Password doesn't match!!");
    }
  };

  return (
    <>
      <div
        className="profile_body"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="register_overlay"></div>
        <div className="profile_box">
          <div className="profile_left">
            <div className="profile_image">
              <img
                src={profileImage}
                alt="Profile Pic"
                style={{ height: "70%" }}
              ></img>
            </div>
          </div>
          <div className="profile_right">
            <form className="profile_form" onSubmit={handleSubmit}>
              <label>Change Profile Pic:</label>
              <input type="file" name="profile" />
              <label>New Username: </label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>New Gmail: </label>
              <input
                type="email"
                name="email"
                value={gmail}
                onChange={(e) => setGmail(e.target.value)}
              />
              <label>New Phone No.</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter new Phone No."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label>New Password:</label>
              <input
                type="password"
                name="new_password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <label>Confirm Password:</label>
              <input
                type="password"
                name="new_confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <input type="submit" value="Update Profile"></input>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
