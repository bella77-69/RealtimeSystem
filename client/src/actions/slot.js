import axios from 'axios';
import { setAlert } from './alert';

import { GET_SLOT, GET_SLOTS, CLEAR_PROFILE } from './types';

// Get all slots
export const getSlots = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get('/api/slot');

    dispatch({
      type: GET_SLOTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.statusText, 'danger'));
  }
};

// Get a slot
export const getSlot = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/slot/${id}`);

    dispatch({
      type: GET_SLOT,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.statusText, 'danger'));
  }
};
