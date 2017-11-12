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
    publicationsByYear(undefined, author),
    (action, state, res) => {
      return res.json().then(json => ({
        author,
        data: json
      }))
    }
  )
}


export default combineReducers({
  bank: reducer,
  setup
})
