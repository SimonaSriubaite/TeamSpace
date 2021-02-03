import React, { useEffect, useState } from "react";
import {
  Breadcrumbs,
  DevicePageList,
  Grid,
  Main,
  ReservationNav,
  ReservationSearch,
  ReservationSideFilters,
} from "../../components";

const DevicesPage = () => {
  const [filterCategores, setFilterCategores] = useState(null);

  useEffect(() => {
    document.title = `Device reservations | Team Space`;
  }, []);

  useEffect(() => {
    const fetchDevicesData = async () => {
      const data = await fetch(
        `${process.env.REACT_APP_DATABASE_URL}/devices`
      ).then((res) => res.json());
      setFilterCategores(data.filterCategories);
    };

    fetchDevicesData();
  }, []);

  return (
    <Main page="standard">
      <Breadcrumbs />
      <ReservationNav isActive="devices" />
      <h1>Device Reservations</h1>
      <ReservationSearch placeholder="Apple" />
      <Grid columnCount={4}>
        <ReservationSideFilters filterCategores={filterCategores} />
        <DevicePageList />
      </Grid>
    </Main>
  );
};

export default DevicesPage;
