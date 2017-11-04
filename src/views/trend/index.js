import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts'
import { Container } from 'reactstrap'
import Loader from '../../components/loader'
import Multigraph from '../../components/multigraph'

import './styles.scss'

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
    console.log(series);
    const yValues = series.map((s, idx) => ({ name: labels[idx], data: s }))

    return (
      <div>
        <Container>
          <Loader loading={loading}>
            <Multigraph
              type='line'
              title='Test Trend Title'
              xTitle='Test X Title'
              xValues={categories}
              yTitle='Test Y Title'
              yValues={yValues}
            />
          </Loader>
        </Container>
      </div>
    )
  }

  onClickSeries(e) {
    console.log(`Author: ${e.point.category}, Publications: ${e.point.y}`)
  }
}

export default Trend
