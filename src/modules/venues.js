import { CALL_API } from 'redux-api-middleware'
import { venues } from '../apis/cir'

const FETCH_VENUES_REQUEST = 'FETCH_VENUE_REQUEST'
const FETCH_VENUES_SUCCESS = 'FETCH_VENUE_SUCCESS'
const FETCH_VENUES_FAILURE = 'FETCH_VENUE_FAILURE'

const initialState = {
  loading: false,
  error: false,
  data: []
}

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VENUES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_VENUES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    case FETCH_VENUES_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      }
    default:
      return state
  }
}

// Selectors
export const getAllVenues = (state) => state.data

// Actions
export const fetchVenues = () => {
  return {
    [CALL_API]: {
      endpoint: venues(),
      method: 'GET',
      types: [FETCH_VENUES_REQUEST, FETCH_VENUES_SUCCESS, FETCH_VENUES_FAILURE]
    }
  }
}

export default reducer
