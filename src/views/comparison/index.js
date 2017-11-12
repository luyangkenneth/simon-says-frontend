import React, { Component } from 'react'
import Setup from './setup'

import Multigraph from '../../components/multigraph'

class Comparison extends Component {
  componentDidMount() {
    const { fetchAuthors } = this.props
    fetchAuthors()
  }

  render() {
    const {
      authors,
      allAuthors,
      setAuthors,
      years,
      setYearRange,
      fetchPublicationTrend,
      completeSetup,
      completedSetup,
      categories,
      series
    } = this.props

    console.log(categories);
    console.log(series);

    return (
      <div>
        {completedSetup ?
          <Multigraph 
            type='line'
            xValues={categories}
            yValues={series}
          /> :
          <Setup
            completeSetup={completeSetup}
            fetchData={fetchPublicationTrend}
            setYearRange={setYearRange}
            years={years}
            authors={allAuthors}
            selectedAuthors={authors}
            setAuthors={setAuthors}
          />
        }
      </div>
    )
  }
}

export default Comparison
