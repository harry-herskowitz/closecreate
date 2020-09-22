import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Routes from './components/routing/Routes'

// Redux
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'

require('halfmoon/css/halfmoon-variables.min.css')

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
        <div class="page-wrapper with-navbar">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default App
