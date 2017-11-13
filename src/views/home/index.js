import React, { Component } from 'react'
import { Container, Row, Col, Jumbotron, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

import FeatureCard from './feature-card'

import './styles.css'

class Home extends Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col xs={12}>
              <Jumbotron className='cir__jumbotron'>
                <h1>Data Visualizations for the Open Research Corpus</h1>
                <p className='lead'>
                  Explore analysis of trends of publications over time and citation
                  webs of your favorite papers.
                </p>
                <hr className="my-2" />
                <Link to='/web'>
                  <Button className="mr-1" color="info">
                    Get Started
                  </Button>
                </Link>
                <a href='http://labs.semanticscholar.org/corpus/'>
                  <Button color="secondary">
                    Open Research Corpus Dataset
                  </Button>
                </a>
              </Jumbotron>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col xs={12} className='mb-3'>
              <h2 className='text-primary'>Explore Visualizations</h2>
            </Col>
            <Col xs={4}>
              <Link style={{ textDecoration: 'none' }} to='/rank/publications'>
                <FeatureCard
                  logo='star'
                  title='Ranks'
                  description='Find out the top authors and publications in the dataset.'
                />
              </Link>
            </Col>
            <Col xs={4}>
              <Link style={{ textDecoration: 'none' }} to='/trend/publications'>
                <FeatureCard
                  logo='chart-bars'
                  title='Trends'
                  description='How have publications changed over time?'
                />
              </Link>
            </Col>
            <Col xs={4}>
              <Link style={{ textDecoration: 'none' }} to='/web'>
                <FeatureCard
                  logo='rocket'
                  title='Citation Web'
                  description='Explore relationships between different publications.'
                />
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Home
