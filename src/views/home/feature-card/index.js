import React from 'react'
import Paper from 'material-ui/Paper'

import './styles.css'

const FeatureCard = ({ logo, title, description }) => (
  <div>
    <Paper transitionEnabled>
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

export default FeatureCard
