import React, { useState, useEffect, createContext } from "react";
import jwtVerifier from "../services/jwtVerifier";

export const UserContext = createContext({});

// Wrapper for authentication state management
const UserProvider = (props) => {
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        const storedToken = localStorage.getItem("token");

        console.log("Current token: " + storedToken);
        console.log("Current userID: " + storedUserId);
        setUserId(storedUserId);
        setToken(storedToken);
        if (storedUserId && storedToken) {
            console.log("Shag");
            setIsAuthenticated(storedUserId === jwtVerifier(storedToken).userId);
        }
    }, [userId, token]);

    const setTokenFunc = (token) => {
        if (token) {
            console.log("token: " + token);
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token", token);
        }
    }

    const setUserIdFunc = (userId) => {
        if (userId) {
            console.log("Id: " + userId);
            localStorage.setItem("userId", userId);
        } else {
            localStorage.removeItem("userId", userId);
        }
    }

    return(
        <UserContext.Provider
            value = {{isAuthenticated ,userId, token, setTokenFunc, setUserIdFunc, setIsAuthenticated }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider;