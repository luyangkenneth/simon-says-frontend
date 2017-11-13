import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
} from 'reactstrap'
import { AutoComplete } from 'material-ui'
import Slider, { createSliderWithTooltip } from 'rc-slider'

import PublicationCard from '../../components/publication-card'
import CitationWeb from '../../components/citation-web'
import Loader from '../../components/loader'
import HoverPaper from '../../components/hover-paper'

import './styles.css'

const TooltipSlider = createSliderWithTooltip(Slider)


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
        x: -0.06,
        y: -0.06
      }
    }

    return (
      <div>
        <Container>
          <Row className='mb-5'>
            <Col lg={6}>
              <HoverPaper className='p-3'>
                <AutoComplete
                  dataSource={titlesLoading ? [] : titles}
                  filter={AutoComplete.caseInsensitiveFilter}
                  onNewRequest={this.handleNewRequest}
                  hintText={'Search by title'}
                  floatingLabelText={'Search by title'}
                  maxSearchResults={10}
                  fullWidth={true}
                  animated={false}
                  disableFocusRipple={false}
                  />
              </HoverPaper>
            </Col>
            <Col lg={6}>
              <HoverPaper className='p-4'>
                <p>Depth of web: <span className='text-primary'>{depth}</span></p>
                <TooltipSlider
                  min={1}
                  max={5}
                  step={1}
                  defaultValue={2}
                  value={depth}
                  onChange={this.handleSliderChange}
                  />
              </HoverPaper>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col lg={6}>
              <Loader loading={citationLoading}>
                <CitationWeb
                  zoom
                  simulationOptions={simulationOptions}
                  onSelectNode={this.showPublication}
                  onDeselectNode={this.hidePublication}
                  defaultSelectedNode={this.defaultNode()}
                  data={entities}
                  />
              </Loader>
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
  handleSliderChange = (newValue) => {
    const { fetchCitationWeb, resetSelectedPublication, title } = this.props

    resetSelectedPublication()
    fetchCitationWeb(title, newValue)
  }

  /**
   * Returns the query publication node id for default selection
   */
  defaultNode = () => {
    const { entities, title } = this.props
    const pub_ids = Object.keys(entities)

    const res = pub_ids.filter(id => entities[id].title === title)

    if (pub_ids.length > 0) {
      return { id: pub_ids[0] }
    } else {
      return { id: '' }
    }
  }
}

export default CitationWebView
