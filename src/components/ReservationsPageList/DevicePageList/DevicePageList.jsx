import React, { useEffect, useState } from "react";
import Available from "../../../assets/gavailable.svg";
import NotAvailable from "../../../assets/notavailable.svg";
import Heart from "../../../assets/bheart.svg";
import RedHeart from "../../../assets/rheart.svg";
import { ReactComponent as Cross } from "../../../assets/cross.svg";
import ResultItem from "../ResultItem/ResultItem";
import { Pagination } from "components";
import "../ReservationPageList.scss";

const DevicePageList = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_DATABASE_URL}/devices`)
      .then((res) => res.json())
      .then((res) => {
        const newData = [];

        Object.keys(res.deviceList).map((key) => {
          return newData.push({
            image: res.deviceList[key]?.image || <div></div>,
            title: res.deviceList[key]?.name || "",
            header: res.deviceList[key]?.brand || "",
            footer:
              <span> QUANTITY: {res.deviceList[key]?.quantity} </span> || "",
            heartIcon: res.deviceList[key]?.favourite ? RedHeart : Heart,
            available: res.deviceList[key]?.bookedUntil
              ? "BOOKED UNTIL " + res.deviceList[key]?.bookedUntil
              : "AVAILABLE",

            availableIcon: res.deviceList[key]?.bookedUntil
              ? NotAvailable
              : Available,
          });
        });
        newData.splice(6);
        setData(newData);
      })
      .catch((error) => {});
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div className="list">
      <div className="list__tags">
        <div className="list__result">24 results for: </div>
        <div className="list__result list__result--italic">Apple</div>
        <button className="list__category">
          Mobile
          <Cross className="list__category-icon" />
        </button>
      </div>

      {data.map((option, index) => {
        return <ResultItem key={index} option={option} />;
      })}
      <Pagination length={4} />
    </div>
  );
};

export default DevicePageList;
