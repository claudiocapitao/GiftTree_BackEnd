const queryDB = require('../db/queryDB');

const routehandlerFunction = async (req, res) => {
    console.log(`-------- GET request - Path: "//validateemail" - Query:${JSON.stringify(req.query)}`)
    const user_email = req.query.user_email
    const user_password = req.query.user_password

    const userEmailQuery = `SELECT * FROM USERS WHERE user_email='${user_email}';`

    try {
        const resultsEmail = await queryDB.queryData(userEmailQuery);

        let canUserLogIn = false;
        let user_id = false;

        if (!!resultsEmail.length) {
            if (resultsEmail[0].USER_PASSWORD == user_password) {
                canUserLogIn = true
                user_id = resultsEmail[0].USER_ID
            } else {
                canUserLogIn = false;
            }
        }

        res.status(200);
        res.json({ canUserLogIn, user_id });
    } catch {
        (e) => {
            console.log(e);
            res.sendStatus(500);
        }
    }

    console.log('---- End GET request - Path: "//validateemail"')
}

module.exports = { routehandlerFunction };