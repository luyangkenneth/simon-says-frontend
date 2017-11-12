const SET_AUTHORS = 'SET_AUTHORS'
const SET_YEAR_RANGE = 'SET_YEAR_RANGE'

const initialState = {
  authors: [],
  years: [1990, 2017]
}

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHORS:
      return {
        ...state,
        authors: action.payload
      }
    case SET_YEAR_RANGE:
      return {
        ...state,
        years: action.payload
      }
    default:
      return state
  }
}

// Selectors
export const getAuthors = (state) => state.authors
export const getYearRange = (state) => state.years

// Actions
export const setAuthors = (authors) => ({
  type: SET_AUTHORS,
  payload: authors
})

export const setYearRange = (start, end) => ({
  type: SET_YEAR_RANGE,
  payload: [start, end]
})

export default reducer
