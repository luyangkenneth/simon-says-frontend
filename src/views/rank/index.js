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
    const { fetchRank, resource } = this.props
    fetchRank(resource)
  }

  render() {
    const {
      resource,
      categories,
      series,
      loading,
      filters,
      updateFilter
    } = this.props
    const labels = ['All Years']

    const yValues = series.map((s, idx) => ({ name: labels[idx], data: s }))

    // TODO: Fetch this from backend
    const conferences = ['AAAI', 'NIPS', 'AIML', 'AIMA']

    return (
      <div>
        <Container>
          <Row style={{ minHeight: '10em' }}>
            <Col xs={12}>
              <Multigraph
                type='bar'
                title={`Top ${resource}`}
                xTitle={resource}
                xValues={categories}
                yValues={yValues}
                yTitle={resource}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <div className='mb-3'>
                <h4>Year Range</h4>
                <Range
                  onChange={val => { updateFilter('year', val) }}
                  onAfterChange={val => { this.loadData() }}
                  defaultValue={[2000, 2017]}
                  min={2000}
                  max={2017}
                />
              </div>
              <div className='mb-3'>
                <h4>Cohort Size</h4>
                <TooltipSlider 
                  min={5}
                  max={30}
                  defaultValue={10}
                  onChange={val => { updateFilter('cohort', val) }}
                  onAfterChange={val => { this.loadData() }}
                />
              </div>
            </Col>
            <Col xs={6}>
              <h4>Search by Conference</h4>
              <AutoComplete
                fullWidth
                filter={AutoComplete.caseInsensitiveFilter}
                dataSource={conferences}
                floatingLabelText='Venue of Conference'
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
