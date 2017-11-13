import React, { Component } from 'react'
import Setup from './setup'

import Loader from '../../components/loader'
import Multigraph from '../../components/multigraph'

class Comparison extends Component {
  componentDidMount() {
    const { fetchAuthors } = this.props
    fetchAuthors()
  }

  render() {
    const {
      loading,
      loadingAuthors,
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

    return (
      <div>
        {completedSetup ?
          <Loader loading={loading}>
            <Multigraph 
              type='line'
              xValues={categories}
              yValues={series}
            />
          </Loader> :
          <Loader loading={loadingAuthors}>
            <Setup
              completeSetup={completeSetup}
              fetchData={fetchPublicationTrend}
              setYearRange={setYearRange}
              years={years}
              authors={allAuthors}
              selectedAuthors={authors}
              setAuthors={setAuthors}
            />
          </Loader>
        }
      </div>
    )
  }
}

export default Comparison
