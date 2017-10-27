import { CALL_API } from 'redux-api-middleware'
import {
  buildUrl,
  AUTHOR,
  COUNT
} from '../apis/cir'

const FETCH_RANK_REQUEST = 'FETCH_RANK_REQUEST'
const FETCH_RANK_SUCCESS = 'FETCH_RANK_SUCCESS'
const FETCH_RANK_FAILURE = 'FETCH_RANK_FAILURE'

const initialState = {
  entities: {},
  loading: true,
  error: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RANK_REQUEST:
      return {
        ...state,
        loading: true
      }

    case FETCH_RANK_SUCCESS:
      return {
      ...state,
        entities: action.payload.result,
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

// Selector
export const getGraphData = (state = initialState, categoryKey) => {
  const { entities } = state
  const sorted = getSortedData(entities)
  const categories = sorted.map(entity => entity[categoryKey])
  const data = sorted.map(entity => entity.count)

  return { categories, data }
}

export const fetchRank = (resource) => ({
  [CALL_API]: {
    endpoint: buildUrl(resource, [AUTHOR], COUNT),
    method: 'GET',
    types: [FETCH_RANK_REQUEST, FETCH_RANK_SUCCESS, FETCH_RANK_FAILURE]
  }
})

// Helpers
function getSortedData(entities) {
  const entitiesArray = Object.keys(entities).map(id => entities[id])
  return entitiesArray.sort((a, b) => a.count < b.count)
}
