import { CALL_API } from 'redux-api-middleware'
import { wordCloud } from '../apis/cir'

const FETCH_WORDCLOUD_REQUEST = 'FETCH_WORDCLOUD_REQUEST'
const FETCH_WORDCLOUD_SUCCESS = 'FETCH_WORDCLOUD_SUCCESS'
const FETCH_WORDCLOUD_FAILURE = 'FETCH_WORDCLOUD_FAILURE'

const initialState = {
  data: [],
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
        data: action.payload.result,
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
  const { data } = state
  return data.map(entity => {
    const key = Object.keys(entity)[0]
    return {
      text: key,
      value: entity[key]
    }
  })
}

export const fetchWords = (author) => ({
  [CALL_API]: {
    endpoint: wordCloud(author),
    method: 'GET',
    types: [FETCH_WORDCLOUD_REQUEST, FETCH_WORDCLOUD_SUCCESS, FETCH_WORDCLOUD_FAILURE]
  }
})
