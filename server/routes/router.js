const express = require('express');
const router = express.Router();
const path = require('path');
const Teacher = require('../models/teacher');
const bearerToken = require('express-bearer-token');
const jwt = require('jsonwebtoken');
const TokenService = require('../token.service');

const unauthorizedStatus = 401;

router.use(bearerToken());

router.post('/api/session', (req, res) => {
    const { token } = req.body;

    if (!token) {
        res.status(unauthorizedStatus).send('Unauthorized');

        return;
    }

    TokenService.verifyToken(token, (error, decoded) => {
        if (error) {
            res.status(unauthorizedStatus).send('Unauthorized');

            return;
        }

        res.json({ decoded });
    });
});

router.post('/api/login', (req, res) => {
    const userCredentials = {
        email: req.body.email,
        password: req.body.password,
    };

    Teacher.authenticate(userCredentials, (error, user) => {
        if (error || !user) {
            res.status(unauthorizedStatus).send('User not found');

            return;
        }

        const token = TokenService.generateToken({ user });

        res.json({ token });
    });
});

router.post('/api/signup', (req, res) => {
    const userInfo = {
        email: req.body.email,
        password: req.body.password,
    };

    Teacher.create(userInfo, (error, user) => {
        const serverError = 500;

        return error
            ? res.status(serverError).send(error)
            : res.json({ user });
    });
});

// router.use((req, res, next) => {
//     const { token } = req;

//     if (!token) {
//         res.status(unauthorizedStatus).send('Unauthorized');

//         return;
//     }

//     TokenService.verifyToken(token, (error, decoded) => {
//         return decoded
//             ? next()
//             : res.status(unauthorizedStatus).send('Unauthorized');
//     });
// });

router.get('*', (req, res) => {
    return res.sendFile(path.resolve('client/dist/index.html'));
});

module.exports = router;