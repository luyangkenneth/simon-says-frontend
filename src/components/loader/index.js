import React from 'react'
import { CircleLoader } from 'react-spinners'


const style = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}

const Loader = ({ loading, children }) => (
  <div>
    {loading ?
      <div style={style}>
        <CircleLoader
          loading={loading}
          color='#123abc'
          size={100} 
        />
        <p className='mt-3 text-center lead'>Loading...</p>
      </div>
        : children}
  </div>
)

export default Loader
