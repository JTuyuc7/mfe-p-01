import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default () => { 
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const props = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
    });
    console.log(props, 'first');
    history.listen(props?.onParentNavigate);
    console.log(history.listen(props?.onParentNavigate), 'history.listen(onParentNavigate)');
  }, []);

  return <div ref={ref} />;
};