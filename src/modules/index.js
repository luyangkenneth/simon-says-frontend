import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import rank from './rank'
import citationWeb from './citation-web'
import trend from './trend'
import wordcloud from './wordcloud'
import venues from './venues'
import authors from './authors'

export default combineReducers({
  routing: routerReducer,
  counter,
  rank,
  citationWeb,
  trend,
  venues,
  authors,
  wordcloud
})
