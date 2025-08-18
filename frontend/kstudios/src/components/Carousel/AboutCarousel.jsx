import React from 'react'
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "./ExampleCarouselImage.jsx";
import studio1 from "../../images/studio_image1.jpg";
import studio2 from "../../images/studio_image2.jpg";
import studio3 from "../../images/studio_image3.jpg";
import studio4 from "../../images/studio_image4.jpg";
import studio5 from "../../images/studio_image5.jpg";
import studio6 from "../../images/studio_image6.jpg";
import studio7 from "../../images/studio_image7.jpg";

const AboutCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <ExampleCarouselImage src={studio1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage src={studio2} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage src={studio3} alt="Third slide" />
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage src={studio4} alt="Fourth slide" />
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage src={studio5} alt="Fifth slide" />
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage src={studio6} alt="Sixth slide" />
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage src={studio7} alt="Seventh slide" />
      </Carousel.Item>
    </Carousel>
  );
}

export default AboutCarousel
