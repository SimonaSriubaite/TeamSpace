import React, { useEffect, useState } from "react";

import Phone from "assets/phone.svg";
import Book from "assets/book.svg";
import Door from "assets/door.svg";
import "./ReservationSection.scss";
import { Categories } from "components";

const ReservationSection = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const reservationData = {
      devices: {
        image: Phone,
        title: "Devices",
        url: "/reservations",
      },
      books: { image: Book, title: "Books", url: "/reservations" },
      rooms: {
        image: Door,
        title: "Meeting rooms",
        url: "/reservations",
      },
    };

    fetch(`${process.env.REACT_APP_DATABASE_URL}/userData`)
      .then((res) => res.json())
      .then((res) => {
        const newData = [];

        Object.keys(res.reservations).map((key) => {
          return newData.push({
            icon: reservationData[key].image,
            title: reservationData[key].title,
            quantity: res.reservations[key].length,
            url: reservationData[key].url,
          });
        });
        setData(newData);
      })
      .catch((error) => {});
  }, []);

  if (!data) {
    return null;
  }

  return (
    <Categories title="Reservations" quantityLabel="RESERVED" data={data} />
  );
};

export default ReservationSection;
