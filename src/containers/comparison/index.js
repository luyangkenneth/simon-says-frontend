import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Comparison from '../../views/comparison'
import {
  setAuthors,
  setYearRange,
  getAuthors,
  getYearRange
} from '../../modules/comparison/setup'
import {
  getAllAuthors,
  fetchAuthors
} from '../../modules/authors'

const mapStateToProps = state => ({
  authors: getAuthors(state.comparison.setup),
  years: getYearRange(state.comparison.setup),
  allAuthors: getAllAuthors(state.authors)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAuthors,
  setAuthors,
  setYearRange
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comparison)
