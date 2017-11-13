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
              title={'Comparison between authors\'s publication count.'}
              xTitle='Year'
              xValues={categories}
              yValues={series}
              yTitle='Publications'
              legend={true}
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
