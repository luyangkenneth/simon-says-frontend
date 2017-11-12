import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Comparison from '../../views/comparison'
import {
  setAuthors,
  setYearRange,
  getAuthors,
  getYearRange,
  completeSetup
} from '../../modules/comparison/setup'
import {
  fetchPublicationTrend
} from '../../modules/comparison'
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
  completeSetup,
  fetchPublicationTrend,
  fetchAuthors,
  setAuthors,
  setYearRange
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comparison)
