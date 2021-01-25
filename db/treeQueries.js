const { db } = require("./connect");

const selectAll = "SELECT * FROM TREE";
const where = " WHERE ";
const and = " AND ";
const equal = (key, val) => `${key}=${db.escape(val)}`;
const lessOrEqual = (key, val) => `${key}<=${db.escape(val)}`;
const moreOrEqual = (key, val) => `${key}>=${db.escape(val)}`;

module.exports = {
    selectAll,
    where,
    and,
    equal,
    db,
    lessOrEqual,
    moreOrEqual,
};
