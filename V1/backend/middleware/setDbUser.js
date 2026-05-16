const db = require('../config/db');

const setDbUser = (req, res, next) => {

    const userId = req.user.user_id;

    db.query(
        'SET @USER_ID = ?',
        [userId],
        (err,res) => {

            if (err) {

                return res.status(500).json({
                    message: 'Failed To Set DB Session User'
                });

            }
            db.query(
                    'SELECT @USER_ID AS USER_ID',
                    (err, result) => {

                        if (err) {

                            return res.status(500).json(err);

                        }
                        // console.log('User Set:', result);
                        req.user_id = result?.[0]?.USER_ID;
                        next();

                    }
                );

        }
    );

};

module.exports = setDbUser;