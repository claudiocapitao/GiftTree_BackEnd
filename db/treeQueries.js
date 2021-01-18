const { db } = require("./connect");

const selectAll = "SELECT * FROM TREE";
const where = " WHERE ";
const and = " AND ";
const addFilter = (type, val) => `${db.escape(type)}=${db.escape(val)}`;

module.exports = { selectAll, where, and, addFilter, db };
