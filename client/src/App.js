import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import NavbarBottom from './components/layout/NavbarBottom'
import Landing from './components/layout/Landing'
import Routes from './components/routing/Routes'

// Redux
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'

import './custom.css'
require('halfmoon/css/halfmoon-variables.min.css')

let theme = 'dark-mode'
window.matchMedia('(prefers-color-scheme: dark)').matches
  ? (theme = 'dark-mode')
  : (theme = 'light-mode')

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token)
    store.dispatch(loadUser())
    if ('geolocation' in navigator) {
      console.log('geolocation supported')
    } else {
      alert('no geolocation support')
    }
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <div
          className={`page-wrapper with-navbar with-navbar-fixed-bottom justify-content-center ${theme}`}
        >
          <Navbar />
          <NavbarBottom />
          <div className="content">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route component={Routes} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  )
}

export default App
