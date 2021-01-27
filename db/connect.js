const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "gifttree",
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
