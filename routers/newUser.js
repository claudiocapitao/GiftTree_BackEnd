const queryDB = require('../db/queryDB');

const routehandlerFunction = async (req, res) => {
    const user_name = req.body.user_name;
    const user_first_name = req.body.user_first_name;
    const user_last_name = req.body.user_last_name;
    const user_password = req.body.user_password;
    const user_email = req.body.user_email;

    console.log(req.body);
    console.log(user_name);
    console.log(user_email);

    console.log(`-------- POST request - Path: "/registration" - Body:${JSON.stringify(req.body)}`);

    const searchUserQuery = `SELECT * FROM USERS WHERE user_name='${user_name}';`
    const searchEmailQuery = `SELECT * FROM USERS WHERE user_email='${user_email}';`
    const addUserQuery = `INSERT INTO USERS (user_name, user_first_name, user_last_name, user_password, user_email)
    VALUES('${user_name}', '${user_first_name}', '${user_last_name}', '${user_password}', '${user_email}');`

    try {

        const searchUser = await queryDB.queryData(searchUserQuery);
        console.log(searchUser);
        console.log(searchUser.length);
        console.log(!searchUser.length);
        console.log(!!searchUser.length);

        const searchEmail = await queryDB.queryData(searchEmailQuery);
        console.log(searchEmail);
        console.log(searchEmail.length);
        console.log(!searchEmail.length);
        console.log(!!searchEmail.length);

        if (searchUser.length == 0 && searchEmail.length == 0) {
            await queryDB.queryData(addUserQuery);
            console.log('User info added')
        }

        res.status(200);
        res.json({ user_exists: !!searchUser.length, email_exists: !!searchEmail.length });

    } catch {
        (e) => {
            console.log(e);
            res.sendStatus(500);
        }
    }

    console.log('---- End POST request - Path: "/registration"')
}

module.exports = { routehandlerFunction };