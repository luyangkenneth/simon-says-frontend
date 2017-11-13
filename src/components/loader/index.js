import React from 'react'
import { CircleLoader } from 'react-spinners'

import './styles.css'

const Loader = ({ loading, children }) => (
  <div>
    {loading ?
      <div className='cir__loader-wrapper'>
        <div className='cir__loader-spinner'>
          <CircleLoader
            loading={loading}
            color='#123abc'
            size={100} 
          />
        </div>
        <div className='cir__loader-text mt-2'>
          <p>Loading...</p>
        </div>
      </div>
      : children}
  </div>
)

export default Loader
