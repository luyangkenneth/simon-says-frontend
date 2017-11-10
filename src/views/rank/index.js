import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts'
import {
  Container,
  Row,
  Col
} from 'reactstrap'
import AutoComplete from 'material-ui/AutoComplete'
import Slider, { createSliderWithTooltip } from 'rc-slider'

import { PUBLICATIONS } from '../../apis/cir'
import Multigraph from '../../components/multigraph'

import 'rc-slider/assets/index.css';
import './styles.scss'

const TooltipSlider = createSliderWithTooltip(Slider)
const Range = createSliderWithTooltip(Slider.Range)

/**
 * RankView shows the ranking of authors in a single time snapshot.
 *
 * e.g. the total number of publications per author in year 2010, or the total
 * number of publications per author across all years.
 *
 */
class Rank extends Component {
  componentDidMount() {
    this.loadData()
  }

  render() {
    const {
      resource,
      categories,
      series,
      loading,
      filters,
      updateFilter,
      title
    } = this.props

    const labels = ['Publications']
    const yValues = series.map((s, idx) => ({ name: labels[idx], data: s }))

    // TODO: Fetch this from backend
    const conferences = ['AAAI', 'NIPS', 'AIML', 'AIMA']

    return (
      <div>
        <Container fluid={true}>
          <Row style={{ minHeight: '10em' }}>
            <Col xs={12}>
              <Multigraph
                type='bar'
                title={title(filters.cohort)}
                xTitle={resource}
                xValues={categories}
                yValues={yValues}
                yTitle={resource}
              />
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col xs={12}>
              <div className='mb-3'>
                <AutoComplete
                  fullWidth
                  filter={AutoComplete.caseInsensitiveFilter}
                  dataSource={conferences}
                  floatingLabelText='Search by Conference'
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <p>From year <strong className='text-primary'>{filters.year[0]}</strong> to year <strong className='text-primary'>{filters.year[1]}</strong></p>
              <Range
                onChange={val => { updateFilter('year', val) }}
                onAfterChange={val => { this.loadData() }}
                defaultValue={filters.year}
                min={2000}
                max={2017}
              />
            </Col>
            <Col xs={6}>
              <p>Top <strong className='text-primary'>{filters.cohort}</strong> authors</p>
              <TooltipSlider 
                min={5}
                max={30}
                defaultValue={filters.cohort}
                onChange={val => { updateFilter('cohort', val) }}
                onAfterChange={val => { this.loadData() }}
                />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

  onClickSeries= (e) => {
    console.log(`Author: ${e.point.category}, Publications: ${e.point.y}`)
  }

  loadData = () => {
    console.log('Loading data...')
    const { fetchRank, resource } = this.props
    fetchRank(resource)
  }
}

export default Rank
