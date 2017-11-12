import React, { Component } from 'react'
import Setup from './setup'

class Comparison extends Component {
  componentDidMount() {
    const { fetchAuthors } = this.props
    fetchAuthors()
  }

  render() {
    const { authors, allAuthors, setAuthors } = this.props
    return (
      <div>
        <Setup
          authors={allAuthors}
          selectedAuthors={authors}
          setAuthors={setAuthors}
        />
      </div>
    )
  }
}

export default Comparison
