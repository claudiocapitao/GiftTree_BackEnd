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
app.use("/", apiRouter); // all `{host}/api` routes will use the apiRouter

// Register
const newUser = require('./routers/newUser')
app.post('/newuser', newUser.routehandlerFunction)

// Log in - confirm if user_name and email already exist in database
const logIn = require('./routers/logIn');
app.get('/login', logIn.routehandlerFunction)

// Filter for user orders in database
const userOrders = require('./routers/userOrders')
app.get('/userorders', userOrders.routeHandlerFunction)

// Filter for user orders in database
const saveNewOrder = require('./routers/saveNewOrder')
app.post('/userorders', saveNewOrder.routeHandlerFunction)

app.listen(port);
console.log(`Server running on port ${port}`);
