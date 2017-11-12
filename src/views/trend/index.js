import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Multigraph from '../../components/multigraph'
import SliderYear from '../rank/slider-year'
import SearchbarAuthor from './searchbar-author'

import './styles.scss'

/**
 * TrendView shows the trend of publications/citations over the years.
 *
 */
class Trend extends Component {
  componentDidMount() {
    this.loadData()
  }

  render() {
    const {
      resource,
      categories,
      filters,
      title,
      series,
      updateFilter
    } = this.props

    const labels = ['Count']

    const yValues = series.map((s, idx) => ({ name: labels[idx], data: s }))

    const authors = ['jane', 'john', 'tom', 'mary'] //TODO replace with api

    return (
      <div>
        <Container fluid={true}>
          <Row style={{ minHeight: '10em' }}>
            <Col xs={12}>
              <Multigraph
                type='line'
                title={title}
                xTitle={resource}
                xValues={categories}
                yTitle={'count'}
                yValues={yValues}
                onClickSeries={this.onClickSeries}
              />
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col xs={12} className='mb-4'>
              <SearchbarAuthor
                authors={authors}
                onChange={val => {updateFilter('author', val)}}
                onConfirm={() => {this.loadData() }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <SliderYear
                onChange={val => {updateFilter('year', val)}}
                onAfterChange={val => { this.loadData() }}
                yearRange={filters.year}
                min={2000}
                max={2017}
              />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

  onClickSeries = (e) => {
    console.log(`Author: ${e.point.category}, Publications: ${e.point.y}`)
  }

  loadData = () => {
    console.log('Loading data...')
    const { fetchTrend, resource } = this.props
    fetchTrend(resource)
  }
}

export default Trend
