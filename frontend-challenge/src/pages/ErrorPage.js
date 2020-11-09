import React from 'react';
import { Container, makeStyles, Paper } from '@material-ui/core';
import HeaderBar from '../components/HeaderBar';

const useStyles = makeStyles((theme) => ({
    img: {
        maxHeight: '250px',
        maxWidth: '250px'
    }
}));

const ErrorPage = ({ history }) => {
    const classes = useStyles();

    return (
        <div>
            <HeaderBar history={history} />
            <Container align="center">
                <h1>404 Error!</h1>
                    <img className={classes.img} alt="Error Image" src='https://www.flaticon.com/svg/static/icons/svg/2621/2621165.svg' />
                <h1>Sorry, this page is not found!</h1>
            </Container>
        </div>
    )
}

export default ErrorPage;
