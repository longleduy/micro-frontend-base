// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { mount } from 'marketing/MarketingApp';
import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: (location: Location) => {
        const { pathname } = history.location;
        if (pathname !== location.pathname) {
          history.push(location.pathname);
        }
      },
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
