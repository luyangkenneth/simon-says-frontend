import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts'
import {
  Container,
  Row,
  Col
} from 'reactstrap'
import TextField from 'material-ui/TextField'
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
    const { resource, categories, series, loading } = this.props
    const labels = ['All Years']

    const yValues = series.map((s, idx) => ({ name: labels[idx], data: s }))

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
                  defaultValue={[2000, 2017]}
                  min={2000}
                  max={2017}
                />
              </div>
              <div className='mb-3'>
                <h4>Cohort Size</h4>
                <TooltipSlider min={5} max={30} defaultValue={10} />
              </div>
              <TextField
                fullWidth
                floatingLabelText='Venue of Conference'
              />
            </Col>
            <Col xs={6}>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

  onClickSeries(e) {
    console.log(`Author: ${e.point.category}, Publications: ${e.point.y}`)
  }
}

export default Rank
