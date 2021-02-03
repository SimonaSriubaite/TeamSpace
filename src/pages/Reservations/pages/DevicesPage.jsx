import React from "react";
import { Main, ReservationSearch, DevicePageList } from "../../../components";

const DevicesPage = () => {
  return (
    <Main>
      <h2>Devices Page</h2>
      <ReservationSearch placeholder="Apple" />
      <DevicePageList />
    </Main>
  );
};
export default DevicesPage;
