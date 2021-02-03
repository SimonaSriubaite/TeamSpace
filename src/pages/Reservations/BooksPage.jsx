import React, { useEffect, useState } from "react";
import {
  BookPageList,
  Breadcrumbs,
  Grid,
  Main,
  ReservationNav,
  ReservationSearch,
  ReservationSideFilters,
} from "../../components";

const BooksPage = () => {
  const [filterCategores, setFilterCategores] = useState(null);

  useEffect(() => {
    document.title = `Book reservations | Team Space`;
  }, []);

  useEffect(() => {
    const fetchDevicesData = async () => {
      const data = await fetch(
        `${process.env.REACT_APP_DATABASE_URL}/books`
      ).then((res) => res.json());
      setFilterCategores(data.filterCategories);
    };

    fetchDevicesData();
  }, []);

  return (
    <Main page="standard">
      <Breadcrumbs />
      <ReservationNav isActive="books" />
      <h1>Book Reservations</h1>
      <ReservationSearch placeholder="Book Title" />
      <Grid columnCount={4}>
        <ReservationSideFilters filterCategores={filterCategores} />
        <BookPageList />
      </Grid>
    </Main>
  );
};

export default BooksPage;
