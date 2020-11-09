const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "mavennet_front_end_challenge";

//  Generate jwtTokens for storing to localStorage
const jwtVerifier = (token) => {
    if (!token) {
        console.error("Token not provided");
    }

    return jwt.verify(token, JWT_SECRET_KEY);
}

module.exports = jwtVerifier;