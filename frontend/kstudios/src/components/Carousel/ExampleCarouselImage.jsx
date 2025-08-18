import React from "react";
import PropTypes from "prop-types";

const ExampleCarouselImage = ({ src, alt }) => {
  return (
    <div className="position-relative w-100 h-100">
      <img
        className="d-block w-100 h-100 object-fit-cover"
        src={src}
        alt={alt}
        style={{
          height: "100vh", // fixed height
          objectFit: "cover", // ensures the image fills space without distortion
        }}
      />
    </div>
  );
};

ExampleCarouselImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export default ExampleCarouselImage;
