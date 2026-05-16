// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const db = require('../config/db');

// require('dotenv').config();

// router.post('/login', (req, res) => {
//     console.log('Auth Routes Loaded');
//     console.log(req.body);
//     const { username, password } = req.body;

//     const sql = `
//                 SELECT *
//                 FROM fnd_user
//                 WHERE USER_NAME = ?
//                 AND ENCRYPTED_USER_PASSWORD = ?
//                 AND NOW() BETWEEN START_DATE AND IFNULL(END_DATE, DATE_ADD(NOW(), INTERVAL 1 DAY))
//             `;

//     db.query(sql, [username, password], (err, result) => {

//         if (err) {
//             return res.status(500).json(err);
//         }

//         if (result.length === 0) {
//             return res.status(401).json({
//                 message: 'Invalid Username or Password'
//             });
//         }

//         const user = result[0];

//         const token = jwt.sign(
//             {
//                 user_id: user.USER_ID,
//                 username: user.USER_NAME
//             },
//             process.env.JWT_SECRET,
//             {
//                 expiresIn: process.env.JWT_EXPIRES_IN
//             }
//         );

//         res.json({
//             message: 'Login Successful',
//             token
//         });

//     });

// });

// module.exports = router;

const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const jwt = require('jsonwebtoken');

const db = require('../config/db');

require('dotenv').config();

router.post('/login', (req, res) => {

    const username  = req.body.username.toUpperCase();
    const password  = req.body.password;
    // console.log(username, password);
    const sql = `
        SELECT *
        FROM fnd_user
        WHERE UPPER(USER_NAME) = ?
        AND NOW() BETWEEN START_DATE
        AND IFNULL(END_DATE, DATE_ADD(NOW(), INTERVAL 1 DAY))
    `;

    db.query(sql, [username], async (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(401).json({
                message: 'Invalid Username or Password'
            });
        }

        const user = result[0];

        // 🔐 PASSWORD CHECK (ONLY CHANGE)
        const isMatch = await bcrypt.compare(
            password,
            user.ENCRYPTED_USER_PASSWORD
        );

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid Username or Password'
            });
        }

        // SET MYSQL SESSION VARIABLE (UNCHANGED)
        db.query(
            'SET @USER_ID = ?',
            [user.USER_ID],
            (setErr) => {

                if (setErr) {
                    return res.status(500).json(setErr);
                }

                const token = jwt.sign(
                    {
                        user_id: user.USER_ID,
                        username: user.USER_NAME
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRES_IN
                    }
                );

                res.json({
                    message: 'Login Successful',
                    token
                });

            }
        );

    });

});

module.exports = router;