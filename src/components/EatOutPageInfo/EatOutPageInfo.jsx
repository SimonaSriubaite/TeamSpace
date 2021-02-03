import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Clock from "../../assets/clock.svg";
import Location from "../../assets/location.svg";
import Phone from "../../assets/phonenumber.svg";
import Website from "../../assets/website.svg";
import PageItem from "./PageItem/PageItem";
import "./EatOutPageInfo.scss";

const EatOutPageInfo = (props) => {
  const [data, setData] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_DATABASE_URL}/restaurantList/${props.id}`)
      .then((res) => res.json())
      .then((res) => {
        const days = res.openingHours[0].days;
        const hours = res.openingHours[0].hours;
        const website = res.website.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
        const time = days + " " + hours;
        setData({ ...res, time: time, website: website });
      })
      .catch((error) => {});
  }, [props.id]);

  if (!data) {
    return null;
  }

  return (
    <div className="page-info">
      <PageItem info={data.address} name="Address" icon={Location} />
      <PageItem info={data.website} name="Website" icon={Website} />
      <PageItem info={data.phone} name="Phone number" icon={Phone} />
      <PageItem info={data.time} name="Work hours" icon={Clock} />
    </div>
  );
};

EatOutPageInfo.propTypes = {
  id: PropTypes.string,
};

export default EatOutPageInfo;
