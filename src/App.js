import React, { Suspense, lazy, useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { Loader, Sidebar, Header, Footer } from "./components";
import "./styles/index.scss";

const DashBoardLazy = lazy(() => import("./pages/Dashboard/Dashboard"));
const EatOutLazy = lazy(() => import("./pages/Eat-Out/EatOut"));
const CategoryPageLazy = lazy(() =>
  import("./pages/Eat-Out/pages/CategoryPage")
);
const SingleRestaurantPageLazy = lazy(() =>
  import("./pages/Eat-Out/pages/SingleRestaurantPage")
);
const DevicesLazy = lazy(() => import("./pages/Reservations/DevicesPage"));
const BooksLazy = lazy(() => import("./pages/Reservations/BooksPage"));
const MeetingRoomsLazy = lazy(() =>
  import("./pages/Reservations/MeetingRoomsPage")
);
const ErrorLazy = lazy(() => import("./pages/Error/Error"));
const TeamLazy = lazy(() => import("./pages/Team/Team"));
const LoginLazy = lazy(() => import("./pages/Login/Login"));
const RegistrationLazy = lazy(() =>
  import("./pages/Registration/Registration")
);

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_DATABASE_URL}/loggedInUser`)
      .then((res) => res.json())
      .then((res) => {
        setUserLoggedIn(res);
        setIsLoading(false);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, []);

  return (
    <div className="container container--full-page">
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/login" component={LoginLazy} />
          <Route exact path="/registration" component={RegistrationLazy} />
          <Route>
            <Sidebar />
            <div className="container container--main-area">
              <Header />
              <Suspense fallback={<Loader />}>
                <Switch>
                  <Route exact path="/">
                    {!isLoading && Object.keys(userLoggedIn).length === 0 ? (
                      <Redirect to="/login" />
                    ) : (
                      <DashBoardLazy />
                    )}
                  </Route>
                  <Route exact path="/eat-out" component={EatOutLazy} />
                  <Route
                    exact
                    path="/eat-out/restaurant/:restaurantName"
                    component={SingleRestaurantPageLazy}
                  />
                  <Route
                    exact
                    path="/eat-out/category/:categoryName"
                    component={CategoryPageLazy}
                  />
                  <Route exact path="/reservations" component={DevicesLazy} />
                  <Route
                    exact
                    path="/reservations/books"
                    component={BooksLazy}
                  />
                  <Route
                    exact
                    path="/reservations/meeting-rooms"
                    component={MeetingRoomsLazy}
                  />
                  <Route exact path="/status-202" component={TeamLazy} />
                  <Route component={ErrorLazy} />
                </Switch>
              </Suspense>
              <Footer />
            </div>
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
