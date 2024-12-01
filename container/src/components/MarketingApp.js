import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory, createBrowserHistory } from 'react-router-dom';

export default () => { 

  const ref = useRef(null);
  const history = useHistory();
  useEffect(() => {
    const props = mount(ref.current, {
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      initialPath: history.location.pathname
    });

    history.listen(props?.onParentNavigate);
    console.log(history.listen(props?.onParentNavigate), 'history.listen(props?.onParentNavigate)');
  }, []);

  return <div ref={ref} />;

}