import { CALL_API } from 'redux-api-middleware'
import { authors } from '../apis/cir'

const FETCH_AUTHORS_REQUEST = 'FETCH_AUTHORS_REQUEST'
const FETCH_AUTHORS_SUCCESS = 'FETCH_AUTHORS_SUCCESS'
const FETCH_AUTHORS_FAILURE = 'FETCH_AUTHORS_FAILURE'

const initialState = {
  loading: true,
  error: false,
  data: []
}

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AUTHORS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case FETCH_AUTHORS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false
      }

    case FETCH_AUTHORS_FAILURE:
      return {
        ...state,
        error: true
      }

    default:
      return state
  }
}

// Selector
export const getAllAuthors = (state) => state.data


// Actions
export const fetchAuthors = () => {
  return {
    [CALL_API]: {
      endpoint: authors(),
      method: 'GET',
      types: [FETCH_AUTHORS_REQUEST, FETCH_AUTHORS_SUCCESS, FETCH_AUTHORS_FAILURE]
    }
  }
}

export default reducer
