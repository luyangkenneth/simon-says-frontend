import { combineReducers } from 'redux'
import {
  citationsByYear,
  publicationsByYear
} from '../apis/cir'
import { createAPIReducer, createAPIAction } from './api'

export const CITATIONS = 'citations'
export const PUBLICATIONS = 'publications'

const UPDATE_FILTER = 'UPDATE_TREND_FILTER'

// Reducers
const api = createAPIReducer('trend', {})

const initialFilter = {
  author: undefined,
  venue: undefined,
  year: [2000,2017]
}

const filtersReducer = (state = initialFilter, action) => {
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

export default combineReducers ({
  filters: filtersReducer,
  api
})

// Selector

export const getGraphData = (state, categoryKey) => {
  const { data } = state.api
  const sorted = getSortedData(data)
  const categories = sorted.map(item => item.year)
  const series = sorted.map(item => item.count)

  return { categories, data: series }
}

// Actions

export const fetchTrend = resource => createAPIAction('trend', state => {
  const { filters } = state.trend
  return getUrlBuilder(resource)(
    filters.venue,
    filters.author
  )
})

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
