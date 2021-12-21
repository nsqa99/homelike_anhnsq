import React from "react";
import Slider from "react-slick";
import DefaultAvatar from "../../constants/images/DefaultAvatar.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const CustomSlider = styled(Slider)`
  .slick-arrow {
    display: none !important;
  }
`

export const MySlider = ({ items, settings }) => {
  const sliderSetting = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    initialSlide: 0,
    ...settings
  };

  return (
    <CustomSlider {...sliderSetting}>
      {items.map((item, indx) => (
        <img
          key={indx}
          src={item.src || DefaultAvatar}
          alt={item.alt || "Default"}
        />
      ))}
    </CustomSlider>
  );
};

