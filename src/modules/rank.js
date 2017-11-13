import { combineReducers } from 'redux'
import {
  topAuthorsByPublications,
  topPublicationsByCitations
} from '../apis/cir'
import { createAPIReducer, createAPIAction } from './api'

export const AUTHORS = 'authors'
export const PUBLICATIONS = 'publications'

const UPDATE_FILTER = 'UPDATE_RANK_FILTER'

// Reducers
const api = createAPIReducer('rank', {})

const initialFilters = {
  venue: undefined,
  year: [2000, 2017],
  cohort: 10
}

const filters = (state = initialFilters, action) => {
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
  filters,
  api
})

// Selectors

export const getGraphData = (state, categoryKey) => {
  const { data } = state.api
  const sorted = getSortedData(data)
  const categories = sorted.map(entity => entity[categoryKey])
  const series = sorted.map(entity => entity.count)

  return { categories, data: series }
}

// Actions

export const fetchRank = resource => createAPIAction('rank', state => {
  const { filters } = state.rank
  return getUrlBuilder(resource)(
    filters.venue,
    filters.cohort,
    filters.year
  )
})

export const updateFilter = (key, value) => ({
  type: UPDATE_FILTER,
  payload: { key, value }
})


// Helpers
function getSortedData(data) {
  return Object.keys(data)
    .map(id => data[id])
    .sort((a, b) => b.count - a.count)
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
