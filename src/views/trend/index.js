import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts'
import {
  Container,
  Row,
  Col
} from 'reactstrap'
import AutoComplete from 'material-ui/AutoComplete'
import Slider, { createSliderWithTooltip } from 'rc-slider'
import Loader from '../../components/loader'
import Multigraph from '../../components/multigraph'

import 'rc-slider/assets/index.css';
import './styles.scss'

const TooltipSlider = createSliderWithTooltip(Slider)
const Range = createSliderWithTooltip(Slider.Range)

/**
 * TrendView shows the trend of publications/citations over the years.
 *
 */
class Trend extends Component {
  componentDidMount() {
    const { fetchTrend, resource } = this.props
    fetchTrend(resource)
  }

  render() {
    const { series, categories, loading } = this.props
    const labels = ['All Years']
    const yValues = series.map((s, idx) => ({ name: labels[idx], data: s }))

    const authors = ['jane', 'john', 'tom', 'mary'] //TODO replace with api

    return (
      <div>
        <Container>
          <Row style={{ minHeight: '10em' }}>
            <Col xs={12}>
              <Multigraph
                type='line'
                title='Test Trend Title'
                xTitle='Test X Title'
                xValues={categories}
                yTitle='Test Y Title'
                yValues={yValues}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <div className='mb-3'>
                <h4>Year Range</h4>
                <Range
                  onAfterChange={val => console.log(val)}
                  defaultValue={[2000, 2017]}
                  min={2000}
                  max={2017}
                />
              </div>
            </Col>
            <Col xs={6}>
              <h4>Search by Author</h4>
              <AutoComplete
                fullWidth
                filter={AutoComplete.caseInsensitiveFilter}
                dataSource={authors}
                floatingLabelText='Author'
              />
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

export default Trend
