import { CALL_API } from 'redux-api-middleware'
import { combineReducers } from 'redux'
import {
  topAuthorsByPublications,
  topPublicationsByCitations
} from '../apis/cir'

export const AUTHORS = 'authors'
export const PUBLICATIONS = 'publications'

const FETCH_RANK_REQUEST = 'FETCH_RANK_REQUEST'
const FETCH_RANK_SUCCESS = 'FETCH_RANK_SUCCESS'
const FETCH_RANK_FAILURE = 'FETCH_RANK_FAILURE'
const UPDATE_FILTER = 'UPDATE_RANK_FILTER'

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

const initialFilters = {
  venue: undefined,
  year: [],
  cohort: 10
}

const filtersReducer = (state = initialFilters, action) => {
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

export default combineReducers({
  filters: filtersReducer,
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

export const fetchRank = (resource, venue, cohort) => ({
  [CALL_API]: {
    endpoint: getUrlBuilder(resource)(venue, cohort),
    method: 'GET',
    types: [FETCH_RANK_REQUEST, FETCH_RANK_SUCCESS, FETCH_RANK_FAILURE]
  }
})

export const updateFilter = (key, value) => ({
  type: UPDATE_FILTER,
  payload: { key, value }
})

// Helpers
function getSortedData(entities) {
  const entitiesArray = Object.keys(entities).map(id => entities[id])
  return entitiesArray.sort((a, b) => a.count < b.count)
}

function getUrlBuilder(resource) {
  let endpoint;
  switch (resource) {
    case AUTHORS:
      return topAuthorsByPublications
    case PUBLICATIONS:
      return topPublicationsByCitations
    default:
      return
  }
}
