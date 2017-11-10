/*****************************************************************
 * Builds the URL with parameters for each API call that we
 * require. All logic with regards to constructing our API query
 * should live here.
 *
 * NOTE: All exported functions returns an API query string. *
 *****************************************************************/

import { stringify } from 'query-string'

const BASE_URL = 'http://localhost:3001/api'
const TOP_AUTHORS_BY_PUBLICATIONS = 'top_authors_by_num_publications'
const TOP_PUBLICATIONS_BY_CITATIONS = 'top_publications_by_num_citations'
const PUBLICATIONS_BY_YEAR = 'num_publications_by_year'
const CITATIONS_BY_YEAR = 'num_citations_by_year'
const CITATION_WEB = 'citation_network'

/**
 * Get the top publications by the number of citations they have.
 *
 * Params:
 * - venue (String): filter by this venue
 * - top (Number): get the top N authors
 */
export const topPublicationsByCitations = (venue, top, years) => {
  const params = { venue, top, years }
  return buildUrl(TOP_PUBLICATIONS_BY_CITATIONS, params)
}

/**
 * Get the top authors by the number of publications they have.
 *
 * Params:
 * - venue (String): filter by this venue
 * - top (Number): get the top N authors
 */
export const topAuthorsByPublications = (venue, top, years) => {
  const params = { venue, top, years }
  return buildUrl(TOP_AUTHORS_BY_PUBLICATIONS, params)
}

/**
 * Get the number of publications by year.
 *
 * Params:
 * - venue (String): filter by this venue
 * - author (String): filter by this author
 */
export const publicationsByYear = (venue, author) => {
  const params = { venue, author }
  return buildUrl(PUBLICATIONS_BY_YEAR, params)
}

/**
 * Get the total number of citations by year.
 *
 * Params:
 * - venue (String): filter by this venue
 * - author (String): filter by this author
 */
export const citationsByYear = (venue, author) => {
  const params = { venue, author }
  return buildUrl(CITATIONS_BY_YEAR, params)
}

/**
 * Gets the required paper for a citation web with the base paper ID.
 *
 * Depth defaults to 2.
 *
 * Params:
 * - baseId (String): title of the base paper
 */
export const citationWeb = (title, depth = 2) => {
  const params = { title, depth }
  return buildUrl(CITATION_WEB, params)
}

/**
 * (HELPER)
 * Build a API query URL to the backend.
 *
 * Returns the string of the complete API query with parameters.
 */
function buildUrl (endpoint, params = {}) {
  // Removes undefined parameters
  const filtered = Object.keys(params)
    .filter(id => params[id] !== undefined)
    .reduce((prev, id) => {
      prev[id] = params[id]
      return prev
    }, {})

  if (Object.keys(filtered).length === 0) {
    return `${BASE_URL}/${endpoint}`
  }

  return `${BASE_URL}/${endpoint}?${stringify(filtered)}`
}
