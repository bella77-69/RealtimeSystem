import axios from 'axios';
import { setAlert } from './alert';

import { SET_CURRENT } from './types';

// Set current state
export const setCurrent = (date, month, year) => (dispatch) => {
  try {
    dispatch({
      type: SET_CURRENT,
      payload: { date, month, year },
    });
  } catch (err) {
    dispatch(setAlert(err.response.statusText, 'danger'));
  }
};

// Set availability
export const setAvailable = (id, availableId) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/slot/${id}/${availableId}`);
    dispatch(setAlert('Successfully booked', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.statusText, 'danger'));
  }
};
