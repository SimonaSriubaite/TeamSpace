import React, { useEffect, useState } from "react";
import Available from "../../../assets/gavailable.svg";
import NotAvailable from "../../../assets/notavailable.svg";
import Heart from "../../../assets/bheart.svg";
import RedHeart from "../../../assets/rheart.svg";
import ResultItem from "../ResultItem/ResultItem";
import { ReactComponent as Cross } from "../../../assets/cross.svg";
import { RatingLabel } from "../../../components";
import "../ReservationPageList.scss";
import { Pagination } from "components";

const BookPageList = () => {
  const [data, setData] = useState(null);

  function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_DATABASE_URL}/books`)
      .then((res) => res.json())
      .then((res) => {
        const newData = [];

        Object.keys(res.bookList).map((key) => {
          return newData.push({
            image: res.bookList[key]?.image || <div></div>,
            title: res.bookList[key]?.title || "",
            header: res.bookList[key]?.author || "",
            footer: (
              <RatingLabel
                rating={round(res.bookList[key]?.rating.score, 1).toString()}
              />
            ),
            heartIcon: res.bookList[key]?.favourite ? RedHeart : Heart,
            available: res.bookList[key]?.bookedUntil
              ? "BOOKED UNTIL " + res.bookList[key]?.bookedUntil
              : "AVAILABLE",

            availableIcon: res.bookList[key]?.bookedUntil
              ? NotAvailable
              : Available,
          });
        });
        newData.splice(9);
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
        <div className="list__result">106 results for: </div>
        <div className="list__result list__result--italic">Apple</div>
        <button className="list__category">
          Action & Adventure
          <Cross className="list__category-icon" />
        </button>
      </div>
      {data.map((option, index) => {
        return <ResultItem key={index} option={option} />;
      })}
      <Pagination length={11} />
    </div>
  );
};

export default BookPageList;
