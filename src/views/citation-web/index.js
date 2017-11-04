import React, { Component } from 'react'
import {
  InteractiveForceGraph,
  ForceGraphNode,
  ForceGraphLink
} from 'react-vis-force'
import { scaleLinear } from 'd3-scale'
import { Container, Row, Col } from 'reactstrap'

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
    const { fetchCitationWeb } = this.props
    fetchCitationWeb()
  }

  render() {
    const { entities, selected, loading } = this.props
    const simulationOptions = {
      height: 500,
      width: 500,
      animate: true,
      strength: {
        x: -0.001,
        y: -0.001
      }
    }
    return (
      <div>
        <Container>
          <Loader loading={loading}>
            <Row className='mb-3'>
              <Col lg={6}>
                <CitationWeb
                  zoom
                  highlightDependencies
                  simulationOptions={simulationOptions}
                  data={entities}
                / >
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
}

export default CitationWebView
