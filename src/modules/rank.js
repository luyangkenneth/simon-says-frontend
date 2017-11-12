import { CALL_API } from 'redux-api-middleware'
import { combineReducers } from 'redux'
import {
  topAuthorsByPublications,
  topPublicationsByCitations,
  venues
} from '../apis/cir'

export const AUTHORS = 'authors'
export const PUBLICATIONS = 'publications'

const FETCH_RANK_REQUEST = 'FETCH_RANK_REQUEST'
const FETCH_RANK_SUCCESS = 'FETCH_RANK_SUCCESS'
const FETCH_RANK_FAILURE = 'FETCH_RANK_FAILURE'
const UPDATE_FILTER = 'UPDATE_RANK_FILTER'

const FETCH_VENUES_REQUEST = 'FETCH_VENUE_REQUEST'
const FETCH_VENUES_SUCCESS = 'FETCH_VENUE_SUCCESS'
const FETCH_VENUES_FAILURE = 'FETCH_VENUE_FAILURE'

// Reducers

const initialState = {
  entities: {},
  loading: true,
  error: false
}

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RANK_REQUEST:
      return {
        ...state,
        loading: true
      }

    case FETCH_RANK_SUCCESS:
      return {
      ...state,
        entities: action.payload,
        loading: false
      }

    case FETCH_RANK_FAILURE:
      return {
        ...state,
        error: true
      }

    default:
      return state
  }
}

const initialVenues = {
  loading: false,
  error: false,
  venues: []
}

const venuesReducer = (state = initialVenues, action) => {
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
        venues: action.payload
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

const initialFilters = {
  venue: undefined,
  year: [2000, 2017],
  cohort: 10
}

const filtersReducer = (state = initialFilters, action) => {
  switch (action.type) {
    case UPDATE_FILTER:
      const { payload } = action
      return {
        ...state,
        [payload.key]: payload.value
      }
    default:
      return state
  }
}

export default combineReducers({
  filters: filtersReducer,
  venues: venuesReducer,
  apiReducer
})

// Selectors

export const getGraphData = (state = initialState, categoryKey) => {
  const { entities } = state.apiReducer
  const sorted = getSortedData(entities)
  const categories = sorted.map(entity => entity[categoryKey])
  const data = sorted.map(entity => entity.count)

  return { categories, data }
}

// Actions

export const fetchRank = (resource) => {
  return (dispatch, getState) => {
    const { filters } = getState().rank

    dispatch({
      [CALL_API]: {
        endpoint: getUrlBuilder(resource)(
          filters.venue,
          filters.cohort,
          filters.year
        ),
        method: 'GET',
        types: [FETCH_RANK_REQUEST, FETCH_RANK_SUCCESS, FETCH_RANK_FAILURE]
      }
    })
  }
}

export const fetchVenues = (resource) => {
  return {
    [CALL_API]: {
      endpoint: venues(),
      method: 'GET',
      types: [FETCH_VENUES_REQUEST, FETCH_VENUES_SUCCESS, FETCH_VENUES_FAILURE]
    }
  }
}

export const updateFilter = (key, value) => ({
  type: UPDATE_FILTER,
  payload: { key, value }
})

// Helpers
function getSortedData(entities) {
  return Object.keys(entities).map(name => ({
    name,
    count: entities[name]
  }))
  .sort((a, b) => a.count < b.count)
}

function getUrlBuilder(resource) {
  switch (resource) {
    case AUTHORS:
      return topAuthorsByPublications
    case PUBLICATIONS:
      return topPublicationsByCitations
    default:
      return
  }
}
