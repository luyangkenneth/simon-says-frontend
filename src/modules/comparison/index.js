import { combineReducers } from 'redux'

import { createAPIReducer, createAPIAction } from '../api'
import { publicationsByYear } from '../../apis/cir'

import setup from './setup'

const RESOURCE = 'COMPARISON_TREND'

// Reducer
const reducer = createAPIReducer(RESOURCE, {}, (state, payload) => ({
  ...state,
  loading: false,
  data: {
    ...state.data,
    [payload.author]: payload.data
  }
}))

// Actions
export const fetchPublicationTrend = author => {
  return createAPIAction(
    RESOURCE,
    () => publicationsByYear(undefined, author),
    (action, state, res) => {
      return res.json().then(json => ({
        author,
        data: json
      }))
    }
  )
}

// Selectors
export const getCategories = (state) => {
  const keys = Object.keys(state.data)
  if (keys.length === 0) {
    return []
  }

  return Object.keys(state.data[keys[0]])
}

export const getSeries = (state) => {
  return Object.keys(state.data)
    .map(name => ({
      name,
      data: Object.keys(state.data[name]).map(id => state.data[name][id])
    }))
}


export default combineReducers({
  bank: reducer,
  setup
})
