const express = require('Express');
const cors = require("cors");
const apiRouter = require("./routers/api");
const queryDB = require('./db/queryDB');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());


// Filter Trees
const { initDbConn } = require("./db/connect");
initDbConn(); // init database connection
app.use("/api", apiRouter); // all `{host}/api` routes will use the apiRouter

// Filter for user orders in database
const userOrders = require('./routers/userOrders')
app.get('/userorders', userOrders.routeHandlerFunction)


app.listen(port);
console.log(`Server running on port ${port}`);
