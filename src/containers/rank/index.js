import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Rank from '../../views/rank'
import { fetchRank, updateFilter, getGraphData } from '../../modules/rank'
import { getAllVenues, fetchVenues } from '../../modules/venues'


export default (resource, categoryKey, title) => {
  const mapStateToProps = state => ({
    loading: state.rank.loading,
    error: state.rank.error,
    categories: getGraphData(state.rank, categoryKey).categories,
    series: [getGraphData(state.rank, categoryKey).data],
    filters: state.rank.filters,
    venues: getAllVenues(state.venues),
    resource,
    title
  })

  const mapDispatchToProps = dispatch => bindActionCreators({
    fetchRank,
    fetchVenues,
    updateFilter
  }, dispatch)

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Rank)
}
