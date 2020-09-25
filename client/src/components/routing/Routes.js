import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Register from '../auth/Register'
import Login from '../auth/Login'
import Alert from '../layout/Alert'
import Dashboard from '../dashboard/Dashboard'
import ProfileForm from '../profile-forms/ProfileForm'
import Profiles from '../profiles/Profiles'
import Profile from '../profile/Profile'
import Matches from '../matches/Matches'
import Chat from '../chat/Chat'
import NotFound from '../layout/NotFound'
import PrivateRoute from '../routing/PrivateRoute'

const Routes = (props) => {
  return (
    <>
      <Alert />
      <div class="content">
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/profile/:id" component={Profile} />
          <PrivateRoute exact path="/profiles" component={Profiles} />
          <PrivateRoute exact path="/matches" component={Matches} />
          <PrivateRoute exact path="/chat/:id1&:id2" component={Chat} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/create-profile" component={ProfileForm} />
          <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </>
  )
}

export default Routes
