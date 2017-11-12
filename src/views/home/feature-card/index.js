import React, { Component } from 'react'
import Paper from 'material-ui/Paper'

import './styles.css'

class FeatureCard extends Component {
  constructor(props) {
    super(props)
    this.state = { zDepth: 1 }
  }

  render() {
    const { logo, title, description } = this.props

    return (
      <div>
        <Paper
          transitionEnabled
          zDepth={this.state.zDepth}
          onMouseOver={() => { this.setState({ zDepth: 2 }) }}
          onMouseOut={() => { this.setState({ zDepth: 1 }) }}
        >
          <div className='cir__feature-card'>
            <div className='cir__feature-card_logo text-center mb-2'>
              <span className={`text-primary lnr lnr-${logo}`}></span>
            </div>
            <h3 className='text-center'>{title}</h3>
            <p className='text-center lead'>{description}</p>
          </div>
        </Paper>
      </div>
    )
  }
}

export default FeatureCard
