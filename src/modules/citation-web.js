import { CALL_API } from 'redux-api-middleware'
import { combineReducers } from 'redux'
import {
  citationWeb,
  publicationTitles,
  publications
 } from '../apis/cir'

const FETCH_WEB_REQUEST = 'FETCH_WEB_REQUEST'
const FETCH_WEB_SUCCESS = 'FETCH_WEB_SUCCESS'
const FETCH_WEB_FAILURE = 'FETCH_WEB_FAILURE'
const FETCH_TITLES_REQUEST = 'FETCH_TITLES_REQUEST'
const FETCH_TITLES_SUCCESS = 'FETCH_TITLES_SUCCESS'
const FETCH_TITLES_FAILURE = 'FETCH_TITLES_FAILURE'
const FETCH_PUBLICATIONS_REQUEST = 'FETCH_PUBLICATIONS_REQUEST'
const FETCH_PUBLICATIONS_SUCCESS = 'FETCH_PUBLICATIONS_SUCCESS'
const FETCH_PUBLICATIONS_FAILURE = 'FETCH_PUBLICATIONS_FAILURE'
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

const citationApiReducerInitialState = {
  entities: {},
  loading: true,
  error: false
}

const citationApiReducer = (state = citationApiReducerInitialState, action) => {
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

const titlesApiReducerInitialState = {
  titles: [],
  loading: true,
  error: false
}

const titlesApiReducer = (state = titlesApiReducerInitialState, action) => {
  switch (action.type) {
    case FETCH_TITLES_REQUEST:
      return {
        ...state,
        loading: true
      }

    case FETCH_TITLES_SUCCESS:
      return {
        ...state,
        titles: makePresentable(action.payload),
        loading: false
      }

    case FETCH_TITLES_FAILURE:
      return {
        ...state,
        error: true
      }

    default:
      return state
  }
}

const publicationsApiReducerInitialState = {
  publications: {},
  loading: true,
  error: false
}

const publicationsApiReducer = (state = publicationsApiReducerInitialState, action) => {
  switch (action.type) {
    case FETCH_PUBLICATIONS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case FETCH_PUBLICATIONS_SUCCESS:
      return {
        ...state,
        publications: {
          ...state.publications,
          [getPublicationId(action.payload)]: action.payload
        },
        loading: false
      }

    case FETCH_PUBLICATIONS_FAILURE:
      return {
        ...state,
        error: true
      }

    default:
      return state
  }
}

const queryReducerInitialState = {
  depth: 2,
  maxDepth: 2,
  title: ''
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
  citationApiReducer,
  titlesApiReducer,
  publicationsApiReducer,
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

    dispatch(changeMaxDepth(queryDepth))
    dispatch(changeTitle(queryTitle))

    dispatch({
      [CALL_API]: {
        endpoint: citationWeb(queryTitle, queryDepth),
        method: 'GET',
        types: [FETCH_WEB_REQUEST, FETCH_WEB_SUCCESS, FETCH_WEB_FAILURE]
      }
    })

    dispatch(changeDepth(queryDepth))
  }
}

export const fetchPublicationTitles = () => {
  return {
    [CALL_API]: {
      endpoint: publicationTitles(),
      method: 'GET',
      types: [FETCH_TITLES_REQUEST, FETCH_TITLES_SUCCESS, FETCH_TITLES_FAILURE]
    }
  }
}

export const fetchPublications = (pub_id) => {
  return {
    [CALL_API]: {
      endpoint: publications(pub_id),
      method: 'GET',
      types: [
        FETCH_PUBLICATIONS_REQUEST,
        FETCH_PUBLICATIONS_SUCCESS,
        FETCH_PUBLICATIONS_FAILURE
      ]
    }
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

const getPublicationId = publication => (publication['publication_id'])

const makePresentable = titles => {
    return titles.sort()
}
