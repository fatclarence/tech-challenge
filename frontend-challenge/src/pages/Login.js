import React, { useState, useEffect } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Button,
  Paper, 
  Avatar, 
  Container, 
  CssBaseline, 
  makeStyles, 
  Typography, 
  FormControl,
  InputLabel,
  FormHelperText, 
  NativeSelect} from '@material-ui/core';

import HeaderBar from '../components/HeaderBar';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: '#875F9A',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(2, 3, 2, 3)
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const Login = () => {
    const classes = useStyles();

    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const getAllUsers = () => {
            axios.get("https://jsonplaceholder.typicode.com/users")
                .then(res => {
                    const fetchedData = res.data?.map(user => {
                        const {
                            id,
                            name,
                            username,
                            email
                        } = user;
    
                        return {
                            userId: id,
                            name: name,
                            username: username,
                            email: email
                        };
                    });

                    setAllUsers(fetchedData.sort((a, b) => a.username - b.username) ?? []);
                })
                .catch(err => console.log("Error fetching user data", err));
        }

        getAllUsers();
    }, []);

    return (
        <div>
            <HeaderBar />
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AccountCircleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <div className={classes.formControl}>
                            <FormControl fullWidth>
                                <InputLabel> Username</InputLabel>
                                <NativeSelect>
                                    <option value="" aria-label="None" selected="selected" />
                                    {allUsers?.map((row) => (
                                        <option value={row.id}>{row.name}</option>
                                    ))}
                                </NativeSelect>
                                <FormHelperText>Click box to select a User</FormHelperText>
                            </FormControl>
                        </div>
                        <div className={classes.formControl}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                        </div>
                    </form>
                </Paper>
                <CssBaseline />
            </Container>
        </div>
    )
}

export default Login;
