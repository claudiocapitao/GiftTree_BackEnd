const apiRoutes = require("express").Router();
const { selectAll, where, and, db } = require("../db/treeQueries");

apiRoutes.get("/trees", (req, res) => {
    let query = selectAll;
    if (Object.keys(req.query).length) {
        query += where;
        Object.keys(req.query).forEach((key, idx) => {
            // TODO: add logic for price ranges
            if (idx != 0) {
                query += and;
            }
            query += key + "=" + "'" + req.query[key] + "'";
        });
    }
    console.log(query);
    db.query(query, (err, results) => {
        if (err) throw err; // if query fails
        res.json(results);
    });
});

/**
 * endpoint to add new tree
 */
apiRoutes.post("/trees", (req, res, next) => {});

module.exports = apiRoutes;
