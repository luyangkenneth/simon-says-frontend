import { createAPIReducer, createAPIAction } from './api'
import { venues } from '../apis/cir'

const RESOURCE = 'venues'

// Reducer
const reducer = createAPIReducer(RESOURCE, [])

// Selectors
export const getAllVenues = (state) => state.data

// Actions
export const fetchVenues = () => createAPIAction(RESOURCE, () => venues())

export default reducer
