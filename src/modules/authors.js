import { authors } from '../apis/cir'
import { createAPIReducer, createAPIAction } from './api'

// Reducer
const reducer = createAPIReducer('authors', [])

// Selector
export const getAllAuthors = (state) => state.data


// Actions
export const fetchAuthors = () => createAPIAction('authors', () => authors())

export default reducer
