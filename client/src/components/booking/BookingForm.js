import React, { useState } from "react";
import { connect } from "react-redux";
import { setAvailable } from "../../actions/current";
import { getSlot } from "../../actions/slot";

const BookingForm = ({ slot, available, current, setAvailable, getSlot }) => {
  const now = new Date();
  const date = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const time = now.getHours();

  const [availableId, setAvailableId] = useState();

  const onChange = (e) => {
    const selectedIndex = e.target.options.selectedIndex;
    const id = e.target.options[selectedIndex].getAttribute("data-key");
    setAvailableId(id);
    // console.log(e.target.options[selectedIndex].getAttribute('data-key'));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(slot._id, availableId);
    setAvailable(slot._id, availableId);
    getSlot(slot._id);
  };

  return (
    <div className="content__form">
      <h3 className="header__heading my-1">Make a Booking</h3>
      <div className="form__group form__group--margin-top">
        <form onSubmit={(e) => onSubmit(e)}>
          <label className="form__label form__label--booking">
            {"Start time"}
          </label>
          <select
            name="startTime"
            className="form__input form__input--select"
            onChange={(e) => onChange(e)}
          >
            <option>* Select Slot</option>
            {available.map((slot) => (
              <option
                key={slot._id}
                data-key={slot._id}
                value={`${slot.startTime}:00 - ${slot.endTime}:00`}
                disabled={
                  !slot.isAvailable ||
                  (slot.startTime <= time && date === current.date) ||
                  date > current.date ||
                  month > current.month ||
                  year > current.year
                }
              >
                {slot.startTime}:00 - {slot.endTime}:00
              </option>
            ))}
          </select>
          <button type="submit" className="btn btn-primary my-1">
            Make a Booking
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  slot: state.slot.slot,
  current: state.current,
});

export default connect(mapStateToProps, { setAvailable, getSlot })(BookingForm);
