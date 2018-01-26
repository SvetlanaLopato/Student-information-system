const jwt = require('jsonwebtoken');

function TokenService() {
    const jwtExpiresTime = "7d";
    const privateKey = 'user-token';

    return {
        generateToken,
        verifyToken,
    };

    function generateToken(payload) {
        return jwt.sign(payload, privateKey, {
            expiresIn: jwtExpiresTime,
        });
    }

    function verifyToken(token, callback) {
        jwt.verify(token, privateKey, callback);
    }
}

module.exports = TokenService();