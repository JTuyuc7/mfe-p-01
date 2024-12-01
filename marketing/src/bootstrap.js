import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createMemoryHistory, createBrowserHistory } from 'history'

const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  const history = defaultHistory || createMemoryHistory()

  if (initialPath) {
    history.push(initialPath)
  }

  if (onNavigate) {
    history.listen(onNavigate)
  }

  ReactDOM.render(<App history={history} />, el)

  // At the end of the mount function
  const onParentNavigate = ({ pathname: nextPathname }) => {
    const { pathname } = history.location
    if (pathname !== nextPathname) {
      history.push(nextPathname)
    }
  }

  console.log('Mount function returning onParentNavigate:', onParentNavigate)

  return {
    onParentNavigate,
  }
}

if (process.env.NODE_ENV === 'development') {
  const el = document.getElementById('marketing-dev-root')

  if (el) {
    mount(el, { defaultHistory: createBrowserHistory() })
  }
}

export { mount }
