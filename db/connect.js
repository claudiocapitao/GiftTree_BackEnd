const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "db_user",
    password: "password",
    database: "gift_tree",
});

const initDbConn = () => {
    connection.connect((err, conn) => {
        if (err) console.error(err);

        console.log("mySql Connection: ", conn);
    });
};

module.exports = {
    db: connection,
    initDbConn,
};
