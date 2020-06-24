import React, { Fragment, useState } from 'react';
import Datetime from 'react-datetime';
import { connect } from 'react-redux';
import { setCurrent } from '../../actions/current';
import { setAlert } from '../../actions/alert';

const Calendar = ({ setCurrent }) => {
  const [formData, setFormData] = useState({
    date: Date.now,
  });

  const { date } = formData;

  const onChange = (date) => {
    setFormData({ date });
    setCurrent(
      date._d.getDate(),
      date._d.getMonth() + 1,
      date._d.getFullYear()
    );
    console.log(
      date._d.getDate(),
      date._d.getMonth() + 1,
      date._d.getFullYear()
    );
  };
  return (
    <div className='cal'>
      <Datetime
        dateFormat='YYYY-MM-DD'
        timeFormat={false}
        onChange={(date) => onChange(date)}
      />
    </div>
  );
};

export default connect(null, { setAlert, setCurrent })(Calendar);
