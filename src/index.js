import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'
import App from './containers/app'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import registerServiceWorker from './registerServiceWorker'

import './styles/main.css'

const target = document.getElementById('root')

const muiTheme = getMuiTheme({
  fontFamily: 'Lato'
})

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <App />
        </MuiThemeProvider>
      </div>
    </ConnectedRouter>
  </Provider>,
  target
)

registerServiceWorker();
