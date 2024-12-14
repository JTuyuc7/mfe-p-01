import React, { lazy, Suspense, useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch, Router, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Header from './components/Header'
import Progress from './components/Progress'
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles'

const MarketingApp = lazy(() => import('./components/MarketingApp'))
const Auth = lazy(() => import('./components/Auth'))
const DashboardApp = lazy(() => import('./components/Dashboard'))

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
})

const history = createBrowserHistory()

export default () => {

  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => { 
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn])

  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <Header signedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
        {/* <hr /> */}
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth" >
              <Auth onSignIn={() => setIsSignedIn(true)} />
            </Route>
            <Route path="/dashboard" >
              {!isSignedIn && <Redirect to="/" />}
              <DashboardApp />
            </Route>
            <Route path="/" >
              <MarketingApp />
            </Route>
          </Switch>
        </Suspense>
        {/* <MarketingApp /> */}
      </Router>
    </StylesProvider>
  )
}
