import React from "react";
import "./Home.css";
import studioLogo from "../../images/studio_logo.png";
import bgImage from "../../images/home_bg.jpg";
import { Link } from "react-router-dom";
import FloatingChatbot from "../ChatBot/FloatingChatbot";

const Home = () => {
  return (
    <div
      className="home_body"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="overlay"></div>
      <div className="home_image">
        <img src={studioLogo} alt="Kathak Studio" className="home_logo" />
      </div>
      <div className="home_button_box">
        <button className="home_button" aria-label="Start Exploring">
          <Link to="/menu" className="menu_button">
            Start Exploring
          </Link>
        </button>
      </div>

      <FloatingChatbot />
    </div>
  );
};

export default Home;
