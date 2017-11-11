import { CALL_API } from 'redux-api-middleware'
import { combineReducers } from 'redux'
import { citationWeb } from '../apis/cir'

const FETCH_WEB_REQUEST = 'FETCH_WEB_REQUEST'
const FETCH_WEB_SUCCESS = 'FETCH_WEB_SUCCESS'
const FETCH_WEB_FAILURE = 'FETCH_WEB_FAILURE'
const SELECT_PUBLICATION = 'SELECT_PUBLICATION'
const RESET_SELECTED_PUBLICATION = 'RESET_SELECTED_PUBLICATION'
const CHANGE_DEPTH = 'CHANGE_DEPTH'
const CHANGE_MAX_DEPTH = 'CHANGE_MAX_DEPTH'
const CHANGE_TITLE = 'CHANGE_TITLE'

// Reducers
const publicationSelection = (state = '', action) => {
  switch(action.type) {
    case SELECT_PUBLICATION:
      return action.payload
    case RESET_SELECTED_PUBLICATION:
      return ''
    default:
      return state
  }
}

const apiReducerInitialState = {
  entities: {},
  loading: true,
  error: false
}

const apiReducer = (state = apiReducerInitialState, action) => {
  switch (action.type) {
    case FETCH_WEB_REQUEST:
      return {
        ...state,
        loading: true
      }

    case FETCH_WEB_SUCCESS:
      return {
        ...state,
        entities: action.payload,
        loading: false
      }

    case FETCH_WEB_FAILURE:
      return {
        ...state,
        error: true
      }

    default:
      return state
  }
}

const queryReducerInitialState = {
  depth: 1,
  maxDepth: 1,
  title: "Dynamic Power Management for the Iterative Decoding of Turbo Codes"
}

const queryReducer = (state = queryReducerInitialState, action) => {
  switch (action.type) {
    case CHANGE_DEPTH:
      return {
        ...state,
        depth: action.payload
      }

    case CHANGE_MAX_DEPTH:
      return {
        ...state,
        maxDepth: action.payload
      }

    case CHANGE_TITLE:
      return {
        ...state,
        title: action.payload
      }

    default:
      return state

  }
}

export default combineReducers({
  selected: publicationSelection,
  apiReducer,
  queryReducer
})

// Selectors
export const selectedPublication = (entities, selection) => {
  if (selection === '') {
    return {}
  }

  return entities[selection]
}

// Actions
export const fetchCitationWeb = (queryTitle, queryDepth) => {
  return (dispatch, getState) => {
    const { maxDepth, title } = getState().citationWeb.queryReducer

    if (queryTitle !== title || queryDepth > maxDepth) {
      // update states
      // call API
      dispatch(changeMaxDepth(queryDepth))
      dispatch(changeTitle(queryTitle))

      dispatch({
        [CALL_API]: {
          endpoint: citationWeb(queryTitle, queryDepth),
          method: 'GET',
          types: [FETCH_WEB_REQUEST, FETCH_WEB_SUCCESS, FETCH_WEB_FAILURE]
        }
      })
    }

    dispatch(changeDepth(queryDepth))
  }
}

export const selectPublication = (publicationId) => ({
  type: SELECT_PUBLICATION,
  payload: publicationId
})

export const resetSelectedPublication = () => ({
  type: RESET_SELECTED_PUBLICATION
})

const changeDepth = (depth) => {
  return {
    type: CHANGE_DEPTH,
    payload: depth
  }
}

const changeMaxDepth = (depth) => {
  return {
    type: CHANGE_MAX_DEPTH,
    payload: depth
  }
}

const changeTitle = (title) => {
  return {
    type: CHANGE_TITLE,
    payload: title
  }
}
