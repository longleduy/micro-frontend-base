// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory, createMemoryHistory, History, Location, LocationListener } from 'history';
import React from 'react';
import ReactDOM, { Container } from 'react-dom';

import App from './App';

// Mount function to start up the app
const mount = (
  el: Container,
  option: { onNavigate?: LocationListener; defaultHistory?: History; initialPath?: string },
) => {
  const history =
    option.defaultHistory ||
    createMemoryHistory({
      initialEntries: option.initialPath ? [option.initialPath] : undefined,
    });

  if (option.onNavigate) {
    history.listen(option.onNavigate);
  }

  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate(location: Location) {
      const { pathname } = history.location;
      if (pathname !== location.pathname) {
        history.push(location.pathname);
      }
    },
  };
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing-dev-root');

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// We are running through container
// and we should export the mount function
export { mount };
