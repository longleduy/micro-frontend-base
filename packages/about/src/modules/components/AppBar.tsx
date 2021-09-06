import React from 'react';

import MuiAppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme: any) => ({
  root: {
    color: theme.palette.common.white,
  },
});

function AppBar(props: any) {
  return <MuiAppBar elevation={0} position="static" {...props} />;
}

export default withStyles(styles)(AppBar);
