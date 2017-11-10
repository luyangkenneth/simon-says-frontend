import React, { Component } from 'react'
import { Container, Row, Col, Jumbotron, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'

import Multigraph from '../../components/multigraph'
import FeatureCard from './feature-card'
import { randomInts } from '../../utils/data-generator'

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
            <Col xs={12}>
              <h2 className='text-primary'>Search</h2>
              <TextField
                fullWidth
                hintText='Search for authors or publications.'
              />
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col xs={12} className='mb-3'>
              <h2 className='text-primary'>Explore Visualizations</h2>
            </Col>
            <Col xs={4}>
              <FeatureCard
                logo='star'
                title='Ranks'
                description='Find out the top authors and publications in the dataset.'
              />
            </Col>
            <Col xs={4}>
              <FeatureCard
                logo='chart-bars'
                title='Trends'
                description='How have publications changed over time?'
              />
            </Col>
            <Col xs={4}>
              <FeatureCard
                logo='rocket'
                title='Citation Web'
                description='Explore relationships between different publications.'
              />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Home
