// eslint-disable-next-line import/no-extraneous-dependencies
import { History } from 'history';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import { createGenerateClassName, StylesProvider } from '@material-ui/core/styles';

import Index from './components/Home';

const generateClassName = createGenerateClassName({
  productionPrefix: 'ab',
});

export default (props: { history: History }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={props.history}>
          <Switch>
            <Route path="/" component={Index} />
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
