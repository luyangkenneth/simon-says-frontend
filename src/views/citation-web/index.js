import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap'
import {
  AutoComplete,
  Slider
} from 'material-ui'
import PublicationCard from '../../components/publication-card'
import CitationWeb from '../../components/citation-web'
import Loader from '../../components/loader'

import './styles.css'


/**
 * CitationWebView creates a force directed graph of the citations between
 * publications. The current implementation is depth limited to 2. However we
 * should be able to extend this to meet requirements of deeper graphs 2. (by
 * passing it as a prop etc.)
 *
 * The current implementation also makes heavy use of react-vis-force, a force
 * directed graph library by Uber.
 *
 */
class CitationWebView extends Component {
  componentDidMount() {
    const { fetchCitationWeb, title, depth } = this.props
    fetchCitationWeb(title, depth)
  }

  render() {
    const { entities, selected, loading, depth } = this.props
    console.log(depth)
    const simulationOptions = {
      height: 500,
      width: 500,
      animate: true,
      strength: {
        x: -0.001,
        y: -0.001
      }
    }

    const publicationTitles = [
      'Dynamic Power Management for the Iterative Decoding of Turbo Codes',
      'Designing Very Good Low-density Parity-check Codes for the Gilbert-elliott Channel',
      'Opportunistic Error Correction for MIMO-OFDM: From Theory to Practice'
    ]

    return (
      <div>
        <Container>
          <Loader loading={loading}>
            <Row className='mb-3'>
              <AutoComplete
                dataSource={publicationTitles}
                filter={AutoComplete.fuzzyFilter}
                onNewRequest={this.handleNewRequest}
                hintText={'Search by title'}
                floatingLabelText={'Title'}
                maxSearchResults={10}
                fullWidth={true}
                />
            </Row>
            <Row className='mb-3'>
              <Col lg={6}>
                <CitationWeb
                  zoom
                  highlightDependencies
                  simulationOptions={simulationOptions}
                  data={entities}
                  />
              </Col>
              <Col lg={6} className='my-auto'>
                {Object.keys(selected).length > 0 ?
                  <PublicationCard
                    className='cir__pub-card'
                    title={selected.title}
                    year={selected.year}
                    abstract={selected.paperAbstract}
                    authors={selected.authors}
                    pdfUrls={selected.pdfUrls}
                    inCitations={selected.inCitations}
                    outCitations={selected.outCitations}
                />
                  :
                  <p className='cir__flashy text-center lead'>
                    Click on a node to view more details
                  </p>
                }
              </Col>
            </Row>
            <Row className='mb-3'>
              <Button
                color='primary'
                onClick={this.changeDepth.bind(this)}
              >
                Change depth
              </Button>
            </Row>
          </Loader>
        </Container>
      </div>
    )
  }

  /**
   * Shows a publication's detail given its node in the graph.
   */
  showPublication(event, node) {
    const { selectPublication } = this.props
    selectPublication(node.id)
  }

  /**
   * Resets the selected publication.
   */
  hidePublication(event, node) {
    const { resetSelectedPublication } = this.props
    resetSelectedPublication()
  }

  /**
   * Change depth of citation web
   */
  changeDepth(depth) {
    const { changeDepth } = this.props
    changeDepth(depth)
  }

  handleNewRequest(chosenRequest, index) {
    console.log(`${chosenRequest}@${index}`)
  }
}

export default CitationWebView
