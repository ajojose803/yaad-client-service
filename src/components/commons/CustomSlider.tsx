"use client";
import dynamic from "next/dynamic";
import { ReactNode } from "react";
const Slider = dynamic(() => import("react-slick"), { ssr: false });

interface CustomSliderProps {
  children: ReactNode[];
}

export default function CustomSlider({ children }: CustomSliderProps) {
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    touchThreshold: 10,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <>
      <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />
      <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css" />
      <div className="slider-container w-full">
        <Slider {...sliderSettings}>{children}</Slider>
      </div>
    </>
  );
}
