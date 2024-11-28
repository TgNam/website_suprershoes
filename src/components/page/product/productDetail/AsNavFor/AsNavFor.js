import React from "react";
import Slider from "react-slick";
import { findListImageByIdProductDetail } from "../../../../../Service/ApiProductImage"; // Import the API function
import "./AsNavFor.scss";

export default class AsNavFor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [], // Store images fetched from the API
      nav1: null,
      nav2: null,
      isLoading: true, // Loading state
      error: null, // Error state
    };
  }

  async componentDidMount() {
    try {
      // Replace `id` with the appropriate product detail ID
      const response = await findListImageByIdProductDetail(this.props.id);
      this.setState({
        images: response.data || [], // Fetch images and store in state
        nav1: this.slider1,
        nav2: this.slider2,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching images:", error);
      this.setState({ error: "Failed to load images.", isLoading: false });
    }
  }

  render() {
    const { images, isLoading, error } = this.state;

    if (isLoading) {
      return <div>Loading images...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    const settingsMain = {
      asNavFor: this.state.nav2,
      ref: (slider) => (this.slider1 = slider),
      arrows: false,
    };

    const settingsNav = {
      asNavFor: this.state.nav1,
      ref: (slider) => (this.slider2 = slider),
      slidesToShow: 3,
      swipeToSlide: true,
      focusOnSelect: true,
      arrows: false,
    };

    return (
      <div>
        <Slider {...settingsMain}>
          {images.map((img, index) => (
            <div
              key={index}
              style={{
                height: "324px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#000",
              }}
            >
              <img
                style={{
                  height: "600px",
                  width: "100%",
                  objectFit: "contain",
                  backgroundColor: "black",
                }}
                src={`data:image/jpeg;base64,${img.imageByte}`} // Assuming images are in Base64 format
                alt={`Product image ${index + 1}`}
                onError={(e) => {
                  e.target.src = "https://placehold.co/600x400"; // Placeholder for broken images
                }}
              />
            </div>
          ))}
        </Slider>
        <Slider {...settingsNav}>
          {images.map((img, index) => (
            <div key={index} style={{ backgroundColor: "black" }}>
              <img
                src={`data:image/jpeg;base64,${img.imageByte}`}
                style={{
                  height: "300px",
                  width: "100%",
                  backgroundColor: "black",
                  objectFit: "cover",
                }}
                alt={`Thumbnail ${index + 1}`}
                onError={(e) => {
                  e.target.src = "https://placehold.co/100x100"; // Placeholder for broken thumbnails
                }}
              />
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
