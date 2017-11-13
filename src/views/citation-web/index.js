import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
} from 'reactstrap'
import {
  AutoComplete,
  Slider
} from 'material-ui'
import PublicationCard from '../../components/publication-card'
import CitationWeb from '../../components/citation-web'

import './styles.css'

class CitationWebView extends Component {
  componentDidMount() {
    const { fetchCitationWeb, fetchPublicationTitles } = this.props
    const { depth, titles } = this.props
    const initialTitle = 'Low-density parity check codes over GF(q)'

    fetchCitationWeb(initialTitle, depth)

    if (titles.length === 0) {
      fetchPublicationTitles()
    }
  }

  render() {
    const {
      entities,
      title,
      depth,
      titles,
      titlesLoading,
      publicationsLoading,
      selected,
      citationLoading
    } = this.props

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
          <Row>
            <Col lg={6}>
              <AutoComplete
                dataSource={titlesLoading ? [] : titles}
                filter={AutoComplete.caseInsensitiveFilter}
                onNewRequest={this.handleNewRequest}
                hintText={'Search by title'}
                floatingLabelText={'Search by title'}
                maxSearchResults={10}
                fullWidth={true}
                />
            </Col>
            <Col lg={6}>
              <h4>Depth of web: {depth}</h4>
              <Slider
                min={1}
                max={5}
                step={1}
                defaultValue={2}
                value={depth}
                onChange={this.handleSliderChange}
                />
            </Col>
          </Row>
          <h4>Citation Web</h4>
          <Row className='mb-3'>
            <Col lg={6}>
              <CitationWeb
                zoom
                highlightDependencies
                simulationOptions={simulationOptions}
                onSelectNode={this.showPublication}
                onDeselectNode={this.hidePublication}
                data={entities}
                />
            </Col>
            <Col lg={6} className='my-auto'>
              {!publicationsLoading && selected && Object.keys(selected).length > 0 ?
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
        </Container>
      </div>
    )
  }

  /**
   * Shows a publication's detail given its node in the graph.
   */
  showPublication = (event, node) => {
    const { selectPublication, fetchPublications, publications } = this.props

    selectPublication(node.id)

    if (!(node.id in publications)) {
      fetchPublications(node.id)
    }
  }

  /**
   * Resets the selected publication.
   */
  hidePublication = (event, node) => {
    const { resetSelectedPublication } = this.props
    resetSelectedPublication()
  }

  /**
   * Fetch data for title change
   */
  handleNewRequest = (chosenRequest, index) => {
    console.log('handleNewRequest')
    const {
      fetchCitationWeb,
      resetSelectedPublication,
      depth,
      titles
    } = this.props

    resetSelectedPublication()

    if (!titles.includes(chosenRequest)) {
      return
    }

    fetchCitationWeb(chosenRequest, depth)
  }

  /**
   * Fetch data for depth change
   */
  handleSliderChange = (event, newValue) => {
    const { fetchCitationWeb, title } = this.props

    fetchCitationWeb(title, newValue)
  }
}

export default CitationWebView
