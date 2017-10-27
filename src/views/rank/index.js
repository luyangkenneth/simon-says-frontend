import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts'
import { Container } from 'reactstrap'

import { PUBLICATIONS } from '../../apis/cir'
import Loader from '../../components/loader'

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
    const { categories, series, loading } = this.props
    const labels = ['All Years']

    return (
      <div>
        <Container>
          <Loader loading={loading}>
            <ReactHighcharts config={this.getConfig({ categories, series }, labels)} />
          </Loader>
        </Container>
      </div>
    )
  }

  onClickSeries(e) {
    console.log(`Author: ${e.point.category}, Publications: ${e.point.y}`)
  }

  // TODO: It is actually possible to abstract this out into a new component if
  // we have strong case of reuse here.
  getConfig({ categories, series }, labels) {
    return {
      colors: ['#274C77', '#6096BA', '#ADF7B6', '#FFEE93', '#D9534F', '#FFC09F'],
      chart: {
        type: 'bar'
      },
      title: {
        text: this.props.title
      },
      xAxis: {
        categories,
        title: {
          text: 'Author'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Publications',
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      },
      tooltip: {
        valueSuffix: ' publications'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          },
          events: {
            click: this.onClickSeries
          }
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'bottom',
        x: -40,
        y: -40,
        floating: true,
      },
      series: series.map((s, idx) => ({ name: labels[idx], data: s }))
    }
  }
}

export default Rank
