import { GET_SLOT, GET_SLOTS, PROFILE_ERROR, CLEAR_PROFILE } from '../actions/types'

const initialState = {
    slot: null,
    slots: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_SLOTS:
            return {
                ...state,
                slots: payload,
                loading: false
            }
        case GET_SLOT: 
            return {
                ...state,
                slot: payload,
                loading: false
            }
        case PROFILE_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			}
		case CLEAR_PROFILE:
			return {
				...state,
				slot: null,
				loading: false
			}
        default:
            return state;
    }
}