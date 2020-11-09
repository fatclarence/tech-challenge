import React, { useState, useEffect, createContext } from "react";
import jwtVerifier from "../services/jwtVerifier";

export const UserContext = createContext({});

// Wrapper for authentication state management
const UserProvider = (props) => {
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        const storedUsername = localStorage.getItem("username");
        const storedToken = localStorage.getItem("token");

        console.log("Current token: " + storedToken);
        console.log("Current userID: " + storedUserId);
        console.log("Current user: " + storedUsername);
        setUserId(storedUserId);
        setToken(storedToken);
        setUsername(storedUsername);
        if (storedUserId && storedToken && storedUsername) {
            setIsAuthenticated(storedUserId === jwtVerifier(storedToken).userId);
        }
    }, [userId, token, username]);

    const setTokenFunc = (token) => {
        if (token) {
            console.log("token: " + token);
            localStorage.setItem("token", token);
            setToken(token);
        } else {
            localStorage.removeItem("token", token);
        }
    }

    const setUserIdFunc = (userId) => {
        if (userId) {
            console.log("Id: " + userId);
            localStorage.setItem("userId", userId);
            setUserId(userId);
        } else {
            localStorage.removeItem("userId", userId);
        }
    }

    const setUsernameFunc = (username) => {
        if (username) {
            console.log("Username: " + username);
            localStorage.setItem("username", username);
            setUsername(username);
        } else {
            localStorage.removeItem("username", username);
        }
    }

    return(
        <UserContext.Provider
            value = {{isAuthenticated, 
                        userId, 
                        token,
                        username,
                        setUsernameFunc, 
                        setTokenFunc, 
                        setUserIdFunc, 
                        setIsAuthenticated }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider;