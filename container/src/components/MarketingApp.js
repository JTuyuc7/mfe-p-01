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
        // console.log("🚀 ~ useEffect ~ pathname desde marketing app container", pathname)
        
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
        // history.push(nextPathname);
      },
      // createBrowserHistory
      initialPath: history.location.pathname
    });

    history.listen(props?.onParentNavigate);
    console.log(history.listen(props?.onParentNavigate))
    // console.log("🚀 ~ useEffect ~ props: in prod?", props)
  }, []);

  return <div ref={ref} />;

}