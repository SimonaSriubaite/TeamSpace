import React, { useState, useEffect, useReducer, useRef } from "react";
import { SlideCard } from "components";
import { ReactComponent as Arrow } from "../../assets/sliderArrow.svg";
import "./Slider.scss";

const SliderContent = () => {
  const [slideData, setSlideData] = useState([]);
  const [width, setWindowWidth] = useState(0);

  const slideTrackRef = useRef();

  const slideTrackWidth = () => {
    return slideTrackRef.current.clientWidth;
  };

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const reducer = (state, action) => {
    switch (action) {
      case "RESET":
        return sliderController;
      case "PREV":
        return handlePrev(state);
      case "NEXT":
        return handleNext(state);
      default:
    }
  };

  const slideNumber = () => {
    return 1;
  };

  const sliderController = {
    slideNumber: slideNumber(),
    numOfSlides: slideData.length,
    translateValue: 0,
  };

  const [sliders, dispatch] = useReducer(reducer, sliderController);

  useEffect(() => {
    const fetchSlideData = async () => {
      const data = await fetch(
        `${process.env.REACT_APP_DATABASE_URL}/restaurants-featured`
      ).then((res) => res.json());
      setSlideData(data);
    };
    fetchSlideData();

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    dispatch("RESET");
  }, [width, slideData.length]);

  function handleNext({ slideNumber, numOfSlides, translateValue }) {
    if (slideNumber >= numOfSlides) {
      return { slideNumber, numOfSlides, translateValue };
    }
    translateValue += -slideTrackWidth();
    return {
      slideNumber: (slideNumber += 1),
      numOfSlides,
      translateValue,
    };
  }

  function handlePrev({ slideNumber, numOfSlides, translateValue }) {
    if (slideNumber <= 1) {
      return { slideNumber, numOfSlides, translateValue };
    }
    translateValue += slideTrackWidth();
    return {
      numOfSlides,
      slideNumber: (slideNumber -= 1),
      translateValue,
    };
  }

  const styleTransform = {
    transform: `translateX(${sliders.translateValue}px)`,
    transition: "transform ease-out 0.45s",
  };

  return (
    <div className="slider">
      <div className="slider-wrapper">
        <div
          className="slider__track"
          ref={slideTrackRef}
          style={styleTransform}
        >
          {slideData &&
            slideData.map((slide) => {
              return (
                <SlideCard
                  key={slide.id}
                  img={slide.image}
                  name={slide.name}
                  about={slide.about}
                  description={slide.description}
                  slideNumber={sliders.slideNumber}
                />
              );
            })}
        </div>
      </div>

      <button
        tabIndex={-1}
        className="slider__arrows slider__arrows--prev"
        onClick={() => dispatch("PREV")}
      >
        <Arrow className="slider__arrows-svg" />
      </button>
      <button
        tabIndex={-1}
        className="slider__arrows slider__arrows--next"
        onClick={() => dispatch("NEXT")}
      >
        <Arrow className="slider__arrows-svg" />
      </button>
    </div>
  );
};

export default SliderContent;
