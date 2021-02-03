import React from "react";
import PropTypes from "prop-types";
import { Button } from "../../components";
import { ReactComponent as ClearAllIcon } from "../../assets/clear-all.svg";
import { ReactComponent as CheckmarkIcon } from "../../assets/checkmark.svg";
import "./ReservationSideFilters.scss";

const ReservationSideFilters = (props) => {
  const handleClearAll = () => {
    const checkboxes = document.getElementsByTagName("input");

    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
  };

  return (
    <aside className="side-filters">
      {props.filterCategores &&
        Object.keys(props.filterCategores).map((category, index) => {
          return (
            <section key={index} className="side-filters__filter-group">
              <header className="side-filters__filter-group-header">
                <h5 className="side-filters__filter-group-title caption">
                  {category}
                </h5>
                <Button
                  type="reservation-empty"
                  id={index}
                  onClick={handleClearAll}
                >
                  Clear all <ClearAllIcon />
                </Button>
              </header>
              {props.filterCategores[category].map((filter, index) => {
                return (
                  <label key={index} id={index} className="checkbox">
                    <input className="checkbox__input" type="checkbox" />
                    <span className="checkbox__fakebox">
                      <CheckmarkIcon />
                    </span>
                    <span className="checkbox__label"> {filter}</span>
                  </label>
                );
              })}
            </section>
          );
        })}
    </aside>
  );
};

ReservationSideFilters.propTypes = {
  filterCategores: PropTypes.object,
};

export default ReservationSideFilters;
