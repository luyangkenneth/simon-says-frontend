import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Trend from '../../views/trend'
import { fetchTrend, updateFilter, getGraphData } from '../../modules/trend'
import { fetchVenues, getAllVenues } from '../../modules/venues'
import { fetchAuthors, getAllAuthors } from '../../modules/authors'

export default (resource, categoryKey, title) => {
  const mapStateToProps = state => ({
    venuesLoading: state.venues.loading,
    authorsLoading: state.authors.loading,
    loading: state.trend.api.loading,
    error: state.trend.api.error,
    categories: getGraphData(state.trend, categoryKey).categories,
    series: [getGraphData(state.trend, categoryKey).data],
    venues: getAllVenues(state.venues),
    authors: getAllAuthors(state.authors),
    filters: state.trend.filters,
    resource,
    title
  })

  const mapDispatchToProps = dispatch => bindActionCreators({
    fetchTrend,
    fetchAuthors,
    fetchVenues,
    updateFilter
  }, dispatch)

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Trend)
}
