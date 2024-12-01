import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history'

const mount = (el, { onNavigate, defaultHistoy, initialPath }) => {
  // console.log("🚀 ~ mount ~ defaultHistoy:", defaultHistoy)
  const history = defaultHistoy ?? createMemoryHistory();

  if (onNavigate) {
    history.listen(onNavigate);
  }

  if (initialPath) {
    const { pathname } = history.location;
    if (pathname !== initialPath) {
      history.push(initialPath);
    }
  }

  ReactDOM.render(
    <App history={history} />,
    el
  );
  // ReactDOM.render(<App />, el);
  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      // console.log("🚀 ~ onParentNavigate ~ pathname: desde marketing-*--*-*", pathname)

      // console.log('Container noticed navigation in Marketing', nextPathname);
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    }
  }
}

if (process.env.NODE_ENV === 'development') {
  const el = document.getElementById('marketing-dev-root');

  if (el) {
    mount(el, { onNavigate: () => {}, defaultHistoy: createBrowserHistory() });
  }
}

export { mount };
