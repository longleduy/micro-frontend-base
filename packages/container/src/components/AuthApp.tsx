// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { mount } from 'auth/AuthApp';
import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

export default (props: { onSignIn: any }) => {
  const ref = useRef(null);
  const history = useHistory();
  const onSignIn = props.onSignIn;
  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: (location: Location) => {
        const { pathname } = history.location;

        if (pathname !== location.pathname) {
          history.push(location.pathname);
        }
      },
      onSignIn,
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
