import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Comparison from '../../views/comparison'
import {
  setAuthors,
  setYearRange,
  getAuthors,
  getYearRange,
  completeSetup,
  completedSetup
} from '../../modules/comparison/setup'
import {
  fetchPublicationTrend,
  getCategories,
  getSeries
} from '../../modules/comparison'
import {
  getAllAuthors,
  fetchAuthors
} from '../../modules/authors'

const mapStateToProps = state => ({
  authors: getAuthors(state.comparison.setup),
  years: getYearRange(state.comparison.setup),
  completedSetup: completedSetup(state.comparison.setup),
  allAuthors: getAllAuthors(state.authors),
  loading: state.comparison.bank.loading,
  data: state.comparison.bank.data,
  categories: getCategories(state.comparison.bank),
  series: getSeries(state.comparison.bank)
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
