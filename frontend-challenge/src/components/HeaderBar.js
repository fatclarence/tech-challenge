import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Link, Grid } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import AppButton from './AppButton';
import { ROUTES } from '../routes/Routes';
import { UserContext } from '../wrappers/UserProvider';

const useStyles = makeStyles((theme) => ({
  appBarBackground: {
    background: '#673ab7'
  },
  root: {
    flexGrow: 1,
  },
  title: {
    marginRight: theme.spacing(2)
  },
}));

const HeaderBar = () => {
  const classes = useStyles();
  const { isAuthenticated, setIsAuthenticated, setUserIdFunc, setTokenFunc, setUsernameFunc } = useContext(UserContext);
  const [routeTo, setRouteTo] = useState('');

  const handleLogOut = () => {
    setUserIdFunc(null);
    setTokenFunc(null);
    setUsernameFunc(null);
    setIsAuthenticated(false);
  }

  useEffect(() => {
    if (isAuthenticated) {
        setRouteTo(ROUTES.ALBUMS)
    } else {
        setRouteTo(ROUTES.LOGIN)
    }
  }, [])

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBarBackground} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link href={routeTo} color="inherit">
                MavenGram
            </Link>
          </Typography>
          {isAuthenticated 
            ? <Grid container justify="flex-end">
                <AppButton handleOnClick={handleLogOut} startIcon={<ExitToAppIcon />} label={"Logout"} color={'red'} />
               </Grid> 
            : null}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default HeaderBar;