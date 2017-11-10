import React from 'react';
import { Route } from 'react-router-dom'

import Home from './home'
import getRankView from './rank'
import CitationWeb from './citation-web'
import Trend from './trend'
import getTrendView from './trend'
import Header from '../components/header'
import Footer from '../components/footer'

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
          'name',
          (cohort) => (`Top ${cohort} authors by publications`)
        )}
      />

      <Route
        exact path="/trend/publications"
        component={getTrendView(
          'publications',
          'year',
          'Top 5 Publications Ranked by Citations'
        )}
      />
      <Route
        exact path="/trend/citations"
        component={getTrendView(
          'citations',
          'year',
          'Top 10 Authors Ranked by Publications'
        )}
      />
      <Route exact path="/web" component={CitationWeb} />
      <Route exact path="/trend" component={Trend} />
    </main>

    <Footer />
  </div>
)

export default App
