import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { createBrowserHistory } from 'history';

export default ({ onSignIn }) => { 
  const ref = useRef(null);
  const history = useHistory();
  // const history = createBrowserHistory();

  useEffect(() => {
    const props = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      defaultHistory: createBrowserHistory(),
      onSignIn
    });
    // console.log(props, 'first');
    history.listen(props?.onParentNavigate);
    // console.log(history.listen(props?.onParentNavigate), 'history.listen(onParentNavigate)');
  }, [history]);

  return <div ref={ref} />;
};