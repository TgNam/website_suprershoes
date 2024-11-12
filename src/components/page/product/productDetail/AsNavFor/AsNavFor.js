import React from "react";
import Slider from "react-slick";
import "./AsNavFor.scss";

export default class AsNavFor extends React.Component {
  constructor(props) {
    super(props);
    this.product = {
      images: [
        "https://i.imgur.com/zpKPVNH.png",
        "https://i.imgur.com/9K4gqoY.png",
        "https://i.imgur.com/zpKPVNH.png",
        "https://i.imgur.com/9K4gqoY.png",
      ],
    };
    this.state = {
      nav1: null,
      nav2: null,
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  render() {
    const settingsMain = {
      asNavFor: this.state.nav2,
      ref: (slider) => (this.slider1 = slider),
      arrows: false, // This enables navigation arrows
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
          {this.product.images.map((img, index) => (
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
                src={img}
                alt={`Product image ${index + 1}`}
              />
            </div>
          ))}
        </Slider>
        <Slider {...settingsNav}>
          {this.product.images.map((img, index) => (
            <div key={index} style={{ backgroundColor: "black" }}>
              <img
                src={img}
                style={{
                  height: "300px",
                  width: "100%",
                  backgroundColor: "black",
                  objectFit: "cover",
                }}
                alt={`Thumbnail ${index + 1}`}
              />
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
