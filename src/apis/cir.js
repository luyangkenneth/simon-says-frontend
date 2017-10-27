/**
 * Builds the URL with parameters for each API call that we require. All logic
 * with regards to constructing our API query should live here.
 */

import { stringify } from 'query-string'

/**
 * Private Constants
 */

const BASE_URL = 'http://localhost:5000'
const GROUPBY = 'groupby'
const AGGREGATE = 'aggregate'

/**
 * Public Constants
 */

// Resources
export const PUBLICATIONS = 'publications'
export const CITATIONS = 'citations'

// Attributes
export const YEAR = 'year'
export const AUTHOR = 'author'

// Aggregations
export const COUNT = 'count'

/**
 * Public Functions
 */

/**
 * Build a API query URL to the backend.
 *
 * Parameters:
 *   - resource (String)
 *   - groupby (Array[String])
 *   - aggregate (String)
 *
 * Returns the string of the complete API query with parameters.
 */
export const buildUrl = (resource, groupby, aggregate) => {
  // Resource endpoint is just the concatenation of base URL and our resource
  const endpoint = `${BASE_URL}/${resource}`

  // Build parameters for our query
  let params = {
    groupby: groupby,
    aggregate: aggregate
  }

  return `${endpoint}?${stringify(params)}`
}
