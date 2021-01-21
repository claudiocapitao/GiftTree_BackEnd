const app = require("express")();
const apiRouter = require("./routers/api");
var cors = require("cors");

const { initDbConn } = require("./db/connect");
initDbConn(); // init database connection

app.use(cors());

app.use("/api", apiRouter); // all `{host}/api` routes will use the apiRouter

const PORT = 8080;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
