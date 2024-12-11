import React, { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import MarketingApp from './components/MarketingApp'
import Header from './components/Header'
import Progress from './components/Progress'
// import Auth from './components/Auth'
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles'

const MarketingApp = lazy(() => import('./components/MarketingApp'))
// const Header = lazy(() => import('./components/Header'))
const Auth = lazy(() => import('./components/Auth'))

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
})

export default () => {

  const [isSignedIn, setIsSignedIn] = useState(false)

  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <Header signedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
        {/* <hr /> */}
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth" >
              <Auth onSignIn={() => setIsSignedIn(true)} />
            </Route>
            <Route path="/" >
              <MarketingApp />
            </Route>
          </Switch>
        </Suspense>
        {/* <MarketingApp /> */}
      </BrowserRouter>
    </StylesProvider>
  )
}
