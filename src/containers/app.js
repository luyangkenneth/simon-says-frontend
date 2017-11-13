import React from 'react';
import { Route } from 'react-router-dom'

import Home from './home'
import getRankView from './rank'
import getTrendView from './trend'
import CitationWeb from './citation-web'
import Comparison from './comparison'
import Header from '../components/header'

import { AUTHORS, PUBLICATIONS } from '../modules/rank'

const App = () => (
  <div>
    <Header />

    <main>
      <Route exact path="/" component={Home} />
      <Route
        exact path="/rank/publications"
        component={getRankView(
          PUBLICATIONS,
          'title',
          (cohort) => (`Top ${cohort} publications by citations`)
        )}
      />
      <Route
        exact path="/rank/authors"
        component={getRankView(
          AUTHORS,
          'author',
          (cohort) => (`Top ${cohort} authors by publications`)
        )}
      />

      <Route
        exact path="/trend/publications"
        component={getTrendView(
          'publications',
          'year',
          'Publication trend over time'
        )}
      />
      <Route
        exact path="/trend/citations"
        component={getTrendView(
          'citations',
          'year',
          'Citation trend over time'
        )}
      />
      <Route
        exact path="/comparison"
        component={Comparison}
      />
      <Route exact path="/web" component={CitationWeb} />
    </main>
  </div>
)

export default App
