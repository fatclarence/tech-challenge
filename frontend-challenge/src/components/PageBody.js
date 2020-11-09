import React from 'react';
import { CssBaseline, Typography, Container, makeStyles, Grid } from '@material-ui/core/';
import AppCard from './AppCard';

const useStyles = makeStyles((theme) => ({
    heroContent: {
      backgroundColor: '#fffff',
      padding: theme.spacing(8, 0, 6),
    },
  }));

    const PageBody = ({ pageTitle, pageInfo, ...rest }) => {
        const classes = useStyles();

        return (
        <>
            <CssBaseline />
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        {pageTitle}
                    </Typography>
                    <Typography variant="subtitle2" align="center" color="textPrimary" gutterBottom>
                        powered by MavenGram
                    </Typography>
                </Container>
            </div>
            <div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {pageInfo.map((info, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <AppCard cardInfo={info} {...rest} />
                        </Grid>
                        ))}
                    </Grid>
                </Container>
            </div>
        </>
      );
  }

  export default PageBody;