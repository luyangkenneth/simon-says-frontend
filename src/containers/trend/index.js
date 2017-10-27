import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Trend from '../../views/trend'
import { fetchTrend, getGraphData } from '../../modules/trend'

const mapStateToProps = state => ({
  loading: state.trend.loading,
  error: state.trend.error,
  series: [getGraphData(state.trend)]
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchTrend
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trend)
