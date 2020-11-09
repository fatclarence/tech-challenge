const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "mavennet_front_end_challenge";

//  Generate jwtTokens for storing to localStorage
const jwtGenerator = (user_id) => {
    const payload = {
        userId: user_id
    }

    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "24hr" });
}

module.exports = jwtGenerator;