import React, { useState, useEffect, useContext } from 'react';
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
import jwtGenerator from '../services/jwtGenerator';
import { UserContext } from '../wrappers/UserProvider';
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
    const { isAuthenticated, setUserIdFunc, setTokenFunc } = useContext(UserContext);

    const [allUsers, setAllUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("")
    const [isError, setIsError] = useState(false);
    
    const handleChange = (e) => {
        console.log(e.target.value);
        setSelectedUserId(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedUserId === "") {
            setIsError(true);
        } else {
            setTokenFunc(jwtGenerator(selectedUserId));
            setUserIdFunc(selectedUserId);
            console.log('Form submitted for ' + selectedUserId);
        }
    }

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

                    setAllUsers(fetchedData ?? []);
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
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <div className={classes.formControl}>
                            <FormControl fullWidth>
                                <InputLabel> Username</InputLabel>
                                <NativeSelect onChange={handleChange}>
                                    <option value="" aria-label="None" selected="selected" />
                                    {allUsers?.map((row) => (
                                        <option value={row.userId}>{row.name}</option>
                                    ))}
                                </NativeSelect>
                                {isError ? <FormHelperText error={isError}>Please make a selection</FormHelperText>
                                        : <FormHelperText error={isError}>Click box to select a User</FormHelperText>}
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
