const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "mavennet_front_end_challenge";

// Verify jwt stored in local storage
const jwtVerifier = (token) => {
    if (!token) {
        console.error("Token not provided");
    }

    return jwt.verify(token, JWT_SECRET_KEY);
}

module.exports = jwtVerifier;