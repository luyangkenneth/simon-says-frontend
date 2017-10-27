import { CALL_API } from 'redux-api-middleware'
import {
  buildUrl,
  AUTHOR,
  COUNT
} from '../apis/cir'

const FETCH_TREND_REQUEST = 'FETCH_TREND_REQUEST'
const FETCH_TREND_SUCCESS = 'FETCH_TREND_SUCCESS'
const FETCH_TREND_FAILURE = 'FETCH_TREND_FAILURE'

const initialState = {
  entities: {},
  loading: true,
  error: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TREND_REQUEST:
      return {
        ...state,
        loading: true
      }

    case FETCH_TREND_SUCCESS:
      return {
      ...state,
        entities: action.payload.result,
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

// Selector
export const getGraphData = (state = initialState) => {
  const { entities } = state
  const papersCount = Object.keys(entities).map(id => entities[id].papers.length)

  return { papersCount }
}

export const fetchTrend = (resource) => ({
  [CALL_API]: {
    endpoint: buildUrl(resource, [AUTHOR], COUNT),
    method: 'GET',
    types: [FETCH_TREND_REQUEST, FETCH_TREND_SUCCESS, FETCH_TREND_FAILURE]
  }
})
