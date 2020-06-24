import { SET_CURRENT, SET_AVAILABLE } from '../actions/types';

const now = new Date();
const date = now.getDate();
const month = now.getMonth() + 1;
const year = now.getFullYear();

const initialState = {
  date,
  month,
  year,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT:
      return {
        ...state,
        date: payload.date,
        month: payload.month,
        year: payload.year,
      };
    default:
      return state;
  }
}
