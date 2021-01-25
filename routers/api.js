const apiRoutes = require("express").Router();
const {
    selectAll,
    where,
    and,
    equal,
    lessOrEqual,
    moreOrEqual,
    db,
} = require("../db/treeQueries");

class Query {
    result = "";

    add(q, type) {
        if (!this.result.includes(where) && this.result.includes("select")) {
            result += where;
        }

        if (type) {
            this.result += type.toUpperCase();
        }

        this.result += q;
    }
}

apiRoutes.get("/trees", async (req, res) => {
    const query = new Query();
    query.add(selectAll);

    if (Object.keys(req.query).length) {
        query.add(where);

        if (req.query.search) {
            query.add(`TREE_NAME LIKE "%${req.query.search}%"`);
            query.add(and);
            delete req.query.search;
        }

        Object.keys(req.query).forEach((key, idx) => {
            if (idx != 0) {
                query.add(and);
            }
            if (key === "PRICE") {
                query.add(moreOrEqual(key, req.query.PRICE.min));
                query.add(and);
                query.add(lessOrEqual(key, req.query.PRICE.max));
            } else {
                query.add(equal(key, req.query[key]));
            }
        });
    }
    console.log(query);
    const [rows, fields] = await db.promise().query(query.result);
    res.json(rows);
});

/**
 * endpoint to add new tree
 */
apiRoutes.post("/trees", (req, res, next) => {});

module.exports = apiRoutes;
