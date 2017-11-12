import React, { Component } from 'react'
import Setup from './setup'

class Comparison extends Component {
  componentDidMount() {
    const { fetchAuthors } = this.props
    fetchAuthors()
  }

  render() {
    const { authors, allAuthors, setAuthors, years, setYearRange } = this.props
    return (
      <div>
        <Setup
          setYearRange={setYearRange}
          years={years}
          authors={allAuthors}
          selectedAuthors={authors}
          setAuthors={setAuthors}
        />
      </div>
    )
  }
}

export default Comparison
