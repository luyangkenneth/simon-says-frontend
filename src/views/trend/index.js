import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts'
import { Container } from 'reactstrap'
import Loader from '../../components/loader'

import './styles.scss'

/**
 * RankView shows the ranking of authors in a single time snapshot.
 *
 * e.g. the total number of publications per author in year 2010, or the total
 * number of publications per author across all years.
 *
 */
class Trend extends Component {
  componentDidMount() {
    const { fetchTrend } = this.props
    fetchTrend('task3')
  }

  render() {
    const { series, loading } = this.props
    const labels = ['All Years']

    return (
      <div>
        <Container>
          <Loader loading={loading}>
            <ReactHighcharts config={this.getConfig({ series }, labels)} />
          </Loader>
        </Container>
      </div>
    )
  }

  onClickSeries(e) {
    console.log(`Author: ${e.point.category}, Publications: ${e.point.y}`)
  }

  getConfig({ series }, labels) {
    return {
      colors: ['#274C77', '#6096BA', '#ADF7B6', '#FFEE93', '#D9534F', '#FFC09F'],
      title: {
        text: 'Number of publications for ICSE'
      },
      yAxis: {
        title: {
          text: 'Number of publications'
        }
      },

      xAxis: {
        tickInterval: 1
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 2010
        }
      },
      series: series.map((s, idx) => ({ name: 'ICSE', data: s.papersCount })),
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    }
  }
}

export default Trend
