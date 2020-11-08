import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Link } from '@material-ui/core';

import { ROUTES } from '../routes/Routes'

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

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBarBackground} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link href={ROUTES.LOGIN} color="inherit">
                MavenGram
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default HeaderBar;