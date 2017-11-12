import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CitationWeb from '../../views/citation-web'
import {
  fetchCitationWeb,
  fetchPublicationTitles,
  fetchPublications,
  selectPublication,
  resetSelectedPublication,
  selectedPublication
} from '../../modules/citation-web'

const mapStateToProps = state => {
  const citationWeb = state.citationWeb
  const citationReducer = citationWeb.citationApiReducer
  const titlesApiReducer = citationWeb.titlesApiReducer
  const publicationsApiReducer = citationWeb.publicationsApiReducer
  const queryReducer = citationWeb.queryReducer

  return {
    citationLoading: citationReducer.loading,
    citationError: citationReducer.error,
    entities: citationReducer.entities,
    titlesLoading: titlesApiReducer.loading,
    titlesError: titlesApiReducer.error,
    titles: titlesApiReducer.titles,
    publicationsLoading: publicationsApiReducer.loading,
    selected: selectedPublication(publicationsApiReducer.publications,
                                  citationWeb.selected),
    depth: queryReducer.depth,
    title: queryReducer.title
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCitationWeb,
  fetchPublicationTitles,
  fetchPublications,
  selectPublication,
  resetSelectedPublication
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CitationWeb)
