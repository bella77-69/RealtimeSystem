import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getSlot } from "../../actions/slot";
import Calender from "../layout/Calender";

import Loading from "react-loading-animation";
import BookingForm from "./BookingForm";

const Booking = ({
  getSlot,
  match,
  slot: { loading, slot },
  current: { date, month, year },
}) => {
  useEffect(() => {
    getSlot(match.params.id);
  }, [getSlot]);

  if (loading === false) {
    const available = slot.available.filter((slot) => {
      return (
        new Date(slot.date).getDate() === date &&
        new Date(slot.date).getMonth() + 1 === month &&
        new Date(slot.date).getFullYear() === year
      );
    });
    console.log(available);
  }

  return (
    <div>
      {loading || slot === null ? (
        <Loading />
      ) : (
        <Fragment>
          <h1 className="large text-primary">{slot.name}</h1>
          <p className="lead">~{slot.status}</p>
          <div className="content__calendar">
            <Calender />
            {!loading && (
              <BookingForm
                slot={slot}
                available={slot.available.filter((slot) => {
                  return (
                    new Date(slot.date).getDate() === date &&
                    new Date(slot.date).getMonth() + 1 === month &&
                    new Date(slot.date).getFullYear() === year
                  );
                })}
              />
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  slot: state.slot,
  current: state.current,
});

export default connect(mapStateToProps, { getSlot })(Booking);
