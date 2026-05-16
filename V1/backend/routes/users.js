const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const db = require('../config/DB');

const verifyToken = require('../middleware/authMiddleware');
const setDbUser = require('../middleware/setDbUser');



// Protected Route
router.get('/user', verifyToken, (req, res) => {

    res.json({
        message: 'Protected Route Accessed',
        user: req.user
    });

});



// Get All Users
router.get('/', verifyToken, setDbUser, (req, res) => {

    db.query(
        'SELECT * FROM per_all_people_f',
        (err, results) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: 'Database Error'
                });

            }

            res.json(results);

        }
    );

});




// Logged-In User Profile
router.get('/profile', verifyToken, setDbUser, (req, res) => {

    const userId = req.user.user_id;

    db.query(
        'SELECT * FROM fnd_user WHERE USER_ID = ?',
        [userId],
        (err, results) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: 'Database Error'
                });

            }

            res.json(results[0]);

        }
    );

});


// Create User Profile
router.post('/create_profile', verifyToken, setDbUser, async (req, res) => {

    const {
        user_name,
        password,
        start_date,
        email,
        description
    } = req.body;

    const userId = req.user.user_id;

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query(
                `INSERT INTO fnd_user (
                    USER_NAME,
                    ENCRYPTED_USER_PASSWORD,
                    CREATION_DATE,
                    CREATED_BY,
                    START_DATE,
                    EMAIL_ADDRESS,
                    DESCRIPTION
                ) VALUES (?, ?, NOW(), ?, CURDATE(), ?, ?)`,
                [
                    user_name,
                    hashedPassword,
                    userId,
                    email || null,
                    description || null
                ],
                (err, result) => {

                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            message: 'Insert Failed'
                        });
                    }

                    res.json({
                        message: 'User Created Successfully',
                        user_id: result.insertId
                    });

                }
            );
    }
    catch(error) {
        console.log(error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
});

// Update Profile Password

router.post('/update_password', verifyToken, setDbUser, async (req, res) => {

    const { user_id, new_password } = req.body;
    // console.log(user_id, new_password, '..Required field..');
    if (!user_id || !new_password) {
        return res.status(400).json({
            message: 'user_id and new_password are required'
        });
    }

    try {

        // 🔐 hash new password
        const hashedPassword = await bcrypt.hash(new_password, 10);

        db.query(
            `UPDATE fnd_user 
             SET ENCRYPTED_USER_PASSWORD = ?,
                 PASSWORD_DATE = NOW(),
                 LAST_UPDATE_DATE = NOW(),
                 LAST_UPDATED_BY = ?
             WHERE USER_ID = ?`,
            [
                hashedPassword,
                req.user.user_id,   // who is updating
                user_id             // target user
            ],
            (err, result) => {

                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Password Update Failed'
                    });
                }

                if (result.affectedRows === 0) {
                    return res.status(404).json({
                        message: 'User not found'
                    });
                }

                res.json({
                    message: 'Password Updated Successfully'
                });

            }
        );

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server Error'
        });
    }

});

// Create User Entry
router.post('/create_user', verifyToken, setDbUser,  (req, res) => {

    const userId = req.user.user_id;

    const {
        first_name,
        last_name,
        email_address,
        sex,
        nationality,
        title,
        town_of_birth
    } = req.body;

    const sql = `
        INSERT INTO per_all_people_f
        (
            EFFECTIVE_START_DATE,
            EFFECTIVE_END_DATE,
            BUSINESS_GROUP_ID,
            PERSON_TYPE_ID,
            FIRST_NAME,
            LAST_NAME,
            START_DATE,
            CURRENT_EMPLOYEE_FLAG,
            EMAIL_ADDRESS,
            SEX,
            NATIONALITY,
            TITLE,
            TOWN_OF_BIRTH,
            CREATED_BY,
            CREATION_DATE,
            LAST_UPDATED_BY,
            LAST_UPDATE_DATE
        )
        VALUES
        (
            NOW(),
            '4712-12-31',
            1,
            1,
            ?,
            ?,
            NOW(),
            'Y',
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            NOW(),
            ?,
            NOW()
        )
    `;

    db.query(
        sql,
        [
            first_name,
            last_name,
            email_address,
            sex,
            nationality,
            title,
            town_of_birth,
            userId,
            userId
        ],
        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: 'Insert Failed'
                });

            }

            res.json({
                message: 'Employee Created Successfully',
                inserted_id: result.insertId
            });

        }
    );

});


// Check Session User ID
router.get('/global_user_id', verifyToken, setDbUser, (req, res) => {
//    console.log(req.user_id);
    res.json({
                message: 'User Set',
                status : 200,
                data   : req.user_id
            });

});

module.exports = router;