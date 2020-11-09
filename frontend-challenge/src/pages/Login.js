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
import axios from 'axios';
import { toast } from 'react-toastify';

import jwtGenerator from '../services/jwtGenerator';
import { HeaderBar } from '../components/components';
import { UserContext } from '../wrappers/UserProvider';
import { ROUTES } from '../routes/Routes'


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

const Login = ({ history }) => {
    const classes = useStyles();
    const { isAuthenticated, setUserIdFunc, setTokenFunc, setIsAuthenticated, setUsernameFunc } = useContext(UserContext);

    const [allUsers, setAllUsers] = useState([]);
    const [fullNames, setFullNames] = useState({});
    const [selectedUserId, setSelectedUserId] = useState("");
    const [selectedUsername, setSelectedUsername] = useState(null);
    const [isError, setIsError] = useState(false);
    
    const handleChange = (e) => {
        const selectedIndex = e.target.selectedIndex;
        setSelectedUsername(e.target[selectedIndex].text);
        setSelectedUserId(e.target.value);
    }

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            if (selectedUserId === "") {
                setIsError(true);
            } else {
                setTokenFunc(jwtGenerator(selectedUserId));
                setUserIdFunc(selectedUserId);
                setUsernameFunc(selectedUsername);
                setIsAuthenticated(true);
                const name = fullNames.get(selectedUserId);
                toast.success(`Welcome back ${name}!`);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            history.push(ROUTES.ALBUMS);
        }
        const getAllUsers = () => {
            axios.get("https://jsonplaceholder.typicode.com/users")
                .then(res => {
                    const usersMap = new Map();
                    const fetchedData = res.data?.map(user => {
                        const {
                            id,
                            name,
                            username,
                            email
                        } = user;

                        usersMap.set(JSON.stringify(id), name);

                        return {
                            userId: id,
                            name: name,
                            username: username,
                            email: email
                        };
                    });
                    console.log(usersMap);
                    setFullNames(usersMap ?? []);
                    console.log(fullNames);
                    setAllUsers(fetchedData ?? []);
                })
                .catch(err => console.log("Error fetching user data", err));
        }

        getAllUsers();
    }, [isAuthenticated]);

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
                                        <option value={row.userId}>{row.username}</option>
                                    ))}
                                </NativeSelect>
                                {isError ? <FormHelperText error={isError}>Please make a selection</FormHelperText>
                                        : <FormHelperText error={isError}>Click box to select a User</FormHelperText>}
                            </FormControl>
                        </div>
                        <div className={classes.formControl}>
                            <Button type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}> Sign In </Button>
                        </div>
                    </form>
                </Paper>
                <CssBaseline />
            </Container>
        </div>
    )
}

export default Login;
