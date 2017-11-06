import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts'
import { Container } from 'reactstrap'

import { PUBLICATIONS } from '../../apis/cir'
import Loader from '../../components/loader'
import Multigraph from '../../components/multigraph'

import './styles.scss'

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
          <Loader loading={loading}>
            <Multigraph
              type='bar'
              title={`Top ${resource}`}
              xTitle={resource}
              xValues={categories}
              yValues={yValues}
              yTitle={resource}
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

export default Rank
