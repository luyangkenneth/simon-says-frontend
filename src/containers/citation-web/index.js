import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CitationWeb from '../../views/citation-web'
import {
  fetchCitationWeb,
  selectPublication,
  resetSelectedPublication,
  selectedPublication,
  changeDepth
} from '../../modules/citation-web'

const mapStateToProps = state => ({
  loading: state.citationWeb.apiReducer.loading,
  error: state.citationWeb.apiReducer.error,
  entities: state.citationWeb.apiReducer.entities,
  selected: selectedPublication(state.citationWeb.apiReducer.entities,
                                state.citationWeb.selected),
  depth: state.citationWeb.depthReducer.depth
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCitationWeb,
  selectPublication,
  resetSelectedPublication,
  changeDepth
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CitationWeb)
