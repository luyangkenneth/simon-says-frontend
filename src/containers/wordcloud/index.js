import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Wordcloud from '../../views/wordcloud'
import { fetchWords, getGraphData } from '../../modules/wordcloud'


export default (resource, title) => {
  const mapStateToProps = state => ({
    loading: state.wordcloud.loading,
    error: state.wordcloud.error,
    series: getGraphData(state.wordcloud),
    title,
    resource
  })

  const mapDispatchToProps = dispatch => bindActionCreators({
    fetchWords
  }, dispatch)

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Wordcloud)
}
