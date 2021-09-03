// eslint-disable-next-line import/no-extraneous-dependencies
import { History } from 'history';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import { createGenerateClassName, StylesProvider } from '@material-ui/core/styles';

import Signin from './components/Signin';
import Signup from './components/Signup';

const generateClassName = createGenerateClassName({
  productionPrefix: 'au',
});

export default (props: { history: History; onSignIn: any }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={props.history}>
          <Switch>
            <Route path="/auth/signin">
              <Signin onSignIn={props.onSignIn} />
            </Route>
            <Route path="/auth/signup">
              <Signup onSignIn={props.onSignIn} />
            </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
