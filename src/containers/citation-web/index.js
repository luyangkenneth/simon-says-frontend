import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CitationWeb from '../../views/citation-web'
import {
  fetchCitationWeb,
  fetchPublicationTitles,
  selectPublication,
  resetSelectedPublication,
  selectedPublication
} from '../../modules/citation-web'

const mapStateToProps = state => ({
  citationLoading: state.citationWeb.citationApiReducer.loading,
  citationError: state.citationWeb.citationApiReducer.error,
  entities: state.citationWeb.citationApiReducer.entities,
  titlesLoading: state.citationWeb.titlesApiReducer.loading,
  titlesError: state.citationWeb.titlesApiReducer.error,
  titles: state.citationWeb.titlesApiReducer.titles,
  selected: selectedPublication(state.citationWeb.citationApiReducer.entities,
                                state.citationWeb.selected),
  depth: state.citationWeb.queryReducer.depth,
  title: state.citationWeb.queryReducer.title
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCitationWeb,
  fetchPublicationTitles,
  selectPublication,
  resetSelectedPublication
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CitationWeb)
