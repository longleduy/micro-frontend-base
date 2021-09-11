import React, { Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';

import fabbiLogo from '../../public/images/fabbi-logo-2.png';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
    a: {
      textDecoration: 'none',
    },
  },
  appBar: {
    position: 'absolute',
    background: 'transparent !important',
  },
  appBarSigined: {
    backgroundColor: '#3c4b64',
  },
  appLogo: {
    width: '150px',
    marginTop: '5px',
    marginBottom: '5px',
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

export default function Header(props: { isSignedIn: any; onSignOut: any }) {
  const classes = useStyles();

  const onClick = () => {
    if (props.isSignedIn && props.onSignOut) {
      props.onSignOut();
    }
  };

  return (
    <React.Fragment>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={props.isSignedIn ? classes.appBarSigined : classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap component={RouterLink} to="/" style={{ flexGrow: 1 }}>
            <img src={fabbiLogo} className={classes.appLogo} />
          </Typography>
          {!props.isSignedIn ? (
            <Fragment>
              <FacebookIcon style={{ fontSize: 40, color: 'white', marginRight: '15px' }} />
              <GitHubIcon style={{ fontSize: 33, color: 'white' }} />
            </Fragment>
          ) : (
            <ExitToAppIcon style={{ fontSize: 35, color: 'white', marginRight: '15px' }} onClick={onClick} />
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
