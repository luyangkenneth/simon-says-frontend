import React from 'react';
import { Route, Link } from 'react-router-dom'
import { Container } from 'reactstrap'

import Home from './home'
import getRankView from './rank'
import CitationWeb from './citation-web'
import Trend from './trend'
import getTrendView from './trend'
import Header from '../components/header'

const App = () => (
  <div>
    <Header />

    <main>
      <Route exact path="/" component={Home} />
      <Route
        exact path="/rank/publications"
        component={getRankView(
          'publications',
          'title',
          'Top 5 Publications Ranked by Citations'
        )}
      />
      <Route
        exact path="/rank/authors"
        component={getRankView(
          'authors',
          'name',
          'Top 10 Authors Ranked by Publications'
        )}
      />

      <Route
        exact path="/trend/publications"
        component={getTrendView(
          'publications',
          'title',
          'Top 5 Publications Ranked by Citations'
        )}
      />
      <Route
        exact path="/trend/citations"
        component={getTrendView(
          'citations',
          'name',
          'Top 10 Authors Ranked by Publications'
        )}
      />
      <Route exact path="/web" component={CitationWeb} />
      <Route exact path="/trend" component={Trend} />
    </main>
  </div>
)

export default App
