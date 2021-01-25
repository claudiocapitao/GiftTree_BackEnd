const queryDB = require('../db/queryDB');

const routehandlerFunction = async (req, res) => {
    console.log(`-------- GET request - Path: "//validateemail" - Query:${JSON.stringify(req.query)}`)
    const user_email = req.query.user_email
    const user_password = req.query.user_password

    const userEmailQuery = `SELECT * FROM USERS WHERE user_email='${user_email}';`

    try {
        const resultsEmail = await queryDB.queryData(userEmailQuery);
        console.log(resultsEmail);

        let canUserLogIn = false;

        if (!!resultsEmail.length) {
            if (resultsEmail[0].USER_PASSWORD == user_password) {
                canUserLogIn = true
            } else {
                canUserLogIn = false;
            }
        }

        console.log(canUserLogIn)

        res.status(200);
        res.json({ canUserLogIn });
    } catch {
        (e) => {
            console.log(e);
            res.sendStatus(500);
        }
    }

    console.log('---- End GET request - Path: "//validateemail"')
}

module.exports = { routehandlerFunction };