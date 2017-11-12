import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Trend from '../../views/trend'
import { fetchTrend, updateFilter, getGraphData } from '../../modules/trend'
import { fetchAuthors, getAllAuthors } from '../../modules/authors'

export default (resource, categoryKey, title) => {
  const mapStateToProps = state => ({
    loading: state.trend.loading,
    error: state.trend.error,
    categories: getGraphData(state.trend, categoryKey).categories,
    series: [getGraphData(state.trend, categoryKey).data],
    authors: getAllAuthors(state.authors),
    filters: state.trend.filters,
    resource,
    title
  })

  const mapDispatchToProps = dispatch => bindActionCreators({
    fetchTrend,
    fetchAuthors,
    updateFilter
  }, dispatch)

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Trend)
}
