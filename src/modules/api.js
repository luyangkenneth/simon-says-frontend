import { CALL_API } from 'redux-api-middleware'

/**
 * Returns a fetch API reducer.
 *
 * @param {string} resource - name of resource that we are fetching
 * @param {Object} defaultData - either an array or an object
 *
 * @return {function} reducer - capable of handling API requests
 */
export const createAPIReducer = (resource, defaultData) => {
  const initialState = {
    loading: false,
    error: false,
    data: defaultData
  }

  return (state = initialState, action) => {
    switch (action.type) {
      case `FETCH_${resource.toUpperCase()}_REQUEST`:
        return {
          ...state,
          loading: true
        }
      case `FETCH_${resource.toUpperCase()}_SUCCESS`:
        return {
          ...state,
          loading: false,
          data: action.payload
        }
      case `FETCH_${resource.toUpperCase()}_FAILURE`:
        return {
          ...state,
          loading: false,
          error: true
        }
      default:
        return state
    }
  }
}

/**
 * Returns a fetch API action.
 *
 * @param {string} resource - name of resource that we are fetching
 * @param {function} endpointBuilder - function that has signature (state),
 *  which returns a string to perform a fetch from
 * @return {function} action - action compatible with redux-api-middleware
 */
export const createAPIAction = (resource, endpointBuilder) => {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({
      [CALL_API]: {
        endpoint: endpointBuilder(state),
        method: 'GET',
        types: [
          `FETCH_${resource.toUpperCase()}_REQUEST`,
          `FETCH_${resource.toUpperCase()}_SUCCESS`,
          `FETCH_${resource.toUpperCase()}_FAILURE`
        ]
      }
    })
  }
}
