const apiRoutes = require("express").Router();
const { selectAll, where, and, db } = require("../db/treeQueries");

apiRoutes.get("/trees", async (req, res) => {
    let query = selectAll;
    if (Object.keys(req.query).length) {
        query += where;
        Object.keys(req.query).forEach((key, idx) => {
            if (idx != 0) {
                query += and;
            }
            if (key === "PRICE") {
                query +=
                    key +
                    ">" +
                    req.query.PRICE.min +
                    and +
                    key +
                    "<" +
                    req.query.PRICE.max;
            } else {
                query += key + "=" + "'" + req.query[key] + "'";
            }
        });
    }
    console.log(query);
    const [rows, fields] = await db.promise().query(query);
    res.json(rows);
});

/**
 * endpoint to add new tree
 */
apiRoutes.post("/trees", (req, res, next) => {});

module.exports = apiRoutes;
