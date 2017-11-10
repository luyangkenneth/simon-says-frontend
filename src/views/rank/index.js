import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

import { PUBLICATIONS } from '../../apis/cir'
import Multigraph from '../../components/multigraph'
import SliderCohort from './slider-cohort'
import SliderYear from './slider-year'
import SearchbarVenue from './searchbar-venue'

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

    // TODO: Not sure what label this should be
    const labels = ['Publications']

    // TODO: This can be moved out into a selector
    const yValues = series.map((s, idx) => ({ name: labels[idx], data: s }))

    // TODO: Fetch this from backend
    const conferences = ['AAAI', 'NIPS', 'AIML', 'AIMA']

    return (
      <div>
        <Container fluid={true}>
          <Row style={{ minHeight: '10em' }}>
            <Col xs={12}>
              <Multigraph
                type='bar'
                title={title(filters.cohort)}
                xTitle={resource}
                xValues={categories}
                yValues={yValues}
                yTitle={resource}
              />
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col xs={12}>
              <SearchbarVenue
                conferences={conferences}
                onChange={val => { updateFilter('venue', val) }}
                onConfirm={() => { this.loadData() }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <SliderYear
                onChange={val => { updateFilter('year', val) }}
                onAfterChange={val => { this.loadData() }}
                yearRange={filters.year}
              />
            </Col>
            <Col xs={6}>
              <SliderCohort
                onChange={val => { updateFilter('cohort', val) }}
                onAfterChange={val => { this.loadData() }}
                cohortValue={filters.cohort}
              />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

  onClickSeries= (e) => {
    // TODO: Do something if series is selected, e.g. open a publication in
    // a publication card.
    console.log(`Author: ${e.point.category}, Publications: ${e.point.y}`)
  }

  loadData = () => {
    console.log('Loading data...')
    const { fetchRank, resource } = this.props
    fetchRank(resource)
  }
}

export default Rank
