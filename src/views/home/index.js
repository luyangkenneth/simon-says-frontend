import React, { Component } from 'react'
import { Container, Jumbotron, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import CitationWeb from '../../components/citation-web'

import './styles.css'

class Home extends Component {
  render() {
    const stubData = {
      "1": {
        "title": "Portal gun and its conundrum",
        "inCitations": ["2", "3"]
      },
      "2": {
        "title": "Existence of gazorpgazorp",
        "inCitations": ["3"]
      },
      "3": {
        "title": "Alcoholism",
        "inCitations": []
      },
    }

    const webSimOpt = {
      height: 500,
      width: 500,
      animate: true,
      strength: {
        x: -0.001,
        y: -0.001
      }
    }

    const showDetails = (event, node) => {
      console.log(node)
    }

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
          <CitationWeb
            zoom
            highlightDependencies
            simulationOptions={webSimOpt}
            onSelectNode={showDetails}
            onDeselectNode={showDetails}
            data={stubData}/>
        </Container>
      </div>
    )
  }
}

export default Home
