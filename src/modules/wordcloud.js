import { CALL_API } from 'redux-api-middleware'

const FETCH_WORDCLOUD_REQUEST = 'FETCH_WORDCLOUD_REQUEST'
const FETCH_WORDCLOUD_SUCCESS = 'FETCH_WORDCLOUD_SUCCESS'
const FETCH_WORDCLOUD_FAILURE = 'FETCH_WORDCLOUD_FAILURE'

const initialState = {
  entities: [],
  loading: true,
  error: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WORDCLOUD_REQUEST:
      return {
        ...state,
        loading: true
      }

    case FETCH_WORDCLOUD_SUCCESS:
      return {
        ...state,
        entities: action.payload.result,
        loading: false
      }

    case FETCH_WORDCLOUD_FAILURE:
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
  const data = entities.map(entity => {
    const key = Object.keys(entity)[0]
    return {
      text: key,
      value: entity[key]
    }
  })

  return data
}

export const fetchWords = (resource) => ({
  [CALL_API]: {
    endpoint: 'http://localhost:5000',
    method: 'GET',
    types: [FETCH_WORDCLOUD_REQUEST, FETCH_WORDCLOUD_SUCCESS, FETCH_WORDCLOUD_FAILURE]
  }
})
