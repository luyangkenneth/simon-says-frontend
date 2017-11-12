import { CALL_API } from 'redux-api-middleware'
import { combineReducers } from 'redux'
import {
  citationsByYear,
  publicationsByYear
} from '../apis/cir'

export const CITATIONS = 'citations'
export const PUBLICATIONS = 'publications'

const FETCH_TREND_REQUEST = 'FETCH_TREND_REQUEST'
const FETCH_TREND_SUCCESS = 'FETCH_TREND_SUCCESS'
const FETCH_TREND_FAILURE = 'FETCH_TREND_FAILURE'
const UPDATE_FILTER = 'UPDATE_TREND_FILTER'

// Reducers

const initialState = {
  entities: {},
  loading: true,
  error: false
}

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TREND_REQUEST:
      return {
        ...state,
        loading: true
      }

    case FETCH_TREND_SUCCESS:
      return {
        ...state,
        entities: action.payload,
        loading: false
      }

    case FETCH_TREND_FAILURE:
      return {
        ...state,
        error: true
      }

    default:
      return state
  }
}

const initialFilter = {
  author: undefined,
  venue: undefined,
  year: [2000,2017]
}

const filtersReducer = (state = initialFilter, action) => {
  switch (action.type) {
    case UPDATE_FILTER:
      console.log(action);
      const { payload } = action
      return {
        ...state,
        [payload.key]: payload.value
      }
    default:
      return state
    }
}

export default combineReducers ({
  filters: filtersReducer,
  apiReducer
})

// Selector

export const getGraphData = (state = initialState, categoryKey) => {
  const { entities } = state.apiReducer
  const sorted = getSortedData(entities)
  const categories = sorted.map(item => item.year)
  const data = sorted.map(item => item.count)

  return { categories, data }
}

// Actions

export const fetchTrend = (resource) => {
  return (dispatch, getState) => {
      const { filters } = getState().rank

      dispatch({
        [CALL_API]: {
          endpoint: getUrlBuilder(resource)(
            filters.venue,
            filters.author
          ),
          method: 'GET',
          types: [FETCH_TREND_REQUEST, FETCH_TREND_SUCCESS, FETCH_TREND_FAILURE]
        }
      })
  }
}

export const updateFilter = (key, value) => ({
  type: UPDATE_FILTER,
  payload: { key, value }
})

// Sort by key
function getSortedData(entities) {
  const sortedKeys = Object.keys(entities).sort()
  return sortedKeys.map(id => ({ year: id, count: entities[id] }))
}

function getUrlBuilder(resource) {
  switch (resource) {
    case CITATIONS:
      return citationsByYear
    case PUBLICATIONS:
      return publicationsByYear
    default:
      return
  }
}
