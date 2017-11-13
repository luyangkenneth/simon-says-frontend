import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

import Loader from '../../components/loader'
import Multigraph from '../../components/multigraph'
import SliderYear from '../rank/slider-year'
import SearchbarAuthor from './searchbar-author'
import SearchVenue from './search-venue'

import './styles.scss'

/**
 * TrendView shows the trend of publications/citations over the years.
 *
 */
class Trend extends Component {
  componentDidMount() {
    this.loadAuthors()
    this.loadVenues()
    this.loadData()
  }

  render() {
    const {
      resource,
      authors,
      venues,
      loading,
      venuesLoading,
      authorsLoading,
      categories,
      filters,
      title,
      series,
      updateFilter
    } = this.props

    const labels = ['Count']

    const yValues = series.map((s, idx) => ({ name: labels[idx], data: s }))

    return (
      <div>
        <Container fluid={true}>
          <Loader loading={loading || authorsLoading || venuesLoading}>
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
          </Loader>
        </Container>
        {authorsLoading ? null :
        <Container>
          <Row>
            <Col xs={6} className='mb-4'>
              <SearchbarAuthor
                authors={authors}
                onConfirm={val => {
                  updateFilter('author', val)
                  this.loadData()
                }}
              />
            </Col>
            <Col xs={6} className='mb-4'>
              <SearchVenue
                venues={venues}
                onConfirm={val => {
                  updateFilter('venue', val)
                  this.loadData()
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <SliderYear
                onChange={val => {updateFilter('year', val)}}
                yearRange={filters.year}
                min={1990}
                max={2017}
              />
            </Col>
          </Row>
        </Container>}
      </div>
    )
  }

  onClickSeries = (e) => {
    console.log(`Author: ${e.point.category}, Publications: ${e.point.y}`)
  }

  loadAuthors = () => {
    console.log('Loading authors...')
    const { fetchAuthors, authors } = this.props
    if (authors.length === 0) {
      fetchAuthors()
    }
  }

  loadVenues = () => {
    console.log('Loading venues...')
    const { fetchVenues, venues } = this.props
    if (venues.length === 0) {
      fetchVenues()
    }
  }

  loadData = () => {
    console.log('Loading data...')
    const { fetchTrend, resource } = this.props
    fetchTrend(resource)
  }
}

export default Trend
