import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts'
import WordCloud from 'react-d3-cloud'
import { scalePow } from 'd3-scale'
import { Container } from 'reactstrap'

import './styles.scss'

class Wordcloud extends Component {
  render() {
    const { series, title } = this.props
    const count = series.map(d => d.value)
    const scale = scalePow()
      .exponent(2)
      .domain([Math.min(...count), Math.max(...count)])
      .range([10, 100])
    const fontSizeMapper = word => scale(word.value)

    return (
      <div>
        <Container>
          <h2 className='text-center'>{title}</h2>
          <div className='text-center'>
            <WordCloud
              data={series}
              fontSizeMapper={fontSizeMapper}
              padding='2'
              font='Lato'/>
          </div>
        </Container>
      </div>
    )
  }
}

export default Wordcloud
