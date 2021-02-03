import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";
import { ReactComponent as Dot } from "../../../assets/dot.svg";
import "./SlideCard.scss";

const Slide = (props) => {
  const [slideData, setSlideData] = useState([]);

  useEffect(() => {
    const fetchSlideData = async () => {
      const data = await fetch(
        `${process.env.REACT_APP_DATABASE_URL}/restaurants-featured`
      ).then((res) => res.json());
      setSlideData(data);
    };
    fetchSlideData();
  }, []);

  const shortenName = (name) => {
    return name.split(",")[0];
  };

  return (
    <div className="slide">
      <figure className="slide__figure">
        <img className="slide__figure-img" src={props.img} alt={props.name} />
      </figure>
      <section className="slide__section">
        <div className="slide-dots">
          {slideData.map((dot, i) => (
            <div
              className={classNames("slide-dots__item", {
                "slide-dots__item--active": i + 1 === props.slideNumber,
              })}
              key={i}
            >
              <Dot className="slide-dots__item-icon" />
            </div>
          ))}
        </div>
        <span className="slide__section-span">{props.about}</span>
        <h2 className="slide__section-title">{shortenName(props.name)}</h2>
        <p className="slide__section-paragraph">{props.description}</p>
        <Link to={`/eat-out/restaurant/${props.name}`}>
          <button tabIndex={-1} className="slide__button" type="large">
            Learn more
          </button>
        </Link>
      </section>
    </div>
  );
};

Slide.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  about: PropTypes.string,
  description: PropTypes.string,
  slideNumber: PropTypes.number,
};

export default Slide;
