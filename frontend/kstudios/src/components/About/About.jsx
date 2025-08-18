import React from "react";
import "./About.css";
import { Carousel } from "@material-tailwind/react";
import AboutCarousel from "../Carousel/AboutCarousel";
import bgImage from "../../images/home_bg.jpg";

const About = () => {
  return (
    <div className="about_body">
      {/* Left side */}
      <div className="about_left">
        <div className="about_info">
          <h1>Welcome to KStudios – </h1>
          <h3>Your Multi-Activity Creative Space</h3>
          <p>
            KStudios is a thoughtfully designed multi-activity center that
            offers a perfect blend of functionality and comfort. Spread across a
            450 sq. ft. usable area, our studio is ideal for a wide range of
            creative, cultural, and professional activities — from dance classes
            and acting workshops to photography, rehearsals, and content
            creation.
          </p>
          <p className="about_features">
            <h5>Key Features & Amenities:</h5>
            <ul>
              <li>450 sq. ft. usable space</li>
              <li>CCTV surveillance & AC</li>
              <li>Full-length mirror & RGB studio lights</li>
              <li>High-quality sound system</li>
              <li>Clean washroom & changing room</li>
              <li>Private cabin & waiting area</li>
              <li>Elegant curtains & green screen setup</li>
              <li>Wi-Fi, TV, tripod & microphone system</li>
            </ul>
          </p>
        </div>
      </div>
      <div className="about_right">
        <AboutCarousel/>
      </div>
    </div>
  );
};

export default About;
