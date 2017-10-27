import React, { Component } from 'react'
import { Container, Jumbotron, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

import './styles.css'

class Home extends Component {
  render() {
    return (
      <div>
        <Container>
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
        </Container>
      </div>
    )
  }
}

export default Home
