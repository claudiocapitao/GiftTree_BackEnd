const queryDB = require('../db/queryDB');

const routeHandlerFunction = async (req, res) => {
    console.log(`-------- POST request - Path: "/userorders" - Body:${JSON.stringify(req.body)}`);

    const { shoppingCart } = req.body
    const { user } = req.body

    const cuDate = new Date(Date.now())
    const curreDate = cuDate.toISOString()
    const currentDate = curreDate.substr(0, 10)

    const maxOrderIDQuery = "SELECT MAX(order_id) as MAX FROM ORDERS;";

    try {
        const resultsMaxOrderIDQuery = await queryDB.queryData(maxOrderIDQuery);
        const maxOrderID = resultsMaxOrderIDQuery[0].MAX;
        const newOrderID = maxOrderID + 1;
        console.log(newOrderID)

        shoppingCart.map(async (tree, idx) => {
            try {
                if (tree.quantity) {
                    const myQuery = `INSERT INTO ORDERS(order_id, user_id, tree_id, buying_date)
                    VALUES(${newOrderID}, ${user}, ${tree.tree_id}, '${currentDate}');`
                    for (let i = 0; i < tree.quantity; i++) {
                        const a = await queryDB.queryData(myQuery);
                    }
                }
            } catch {
                (e) => {
                    console.log(e);
                    res.sendStatus(500);
                }
            }
        })
        res.status(200);
        res.json('Data was saved :)');

    } catch {
        (e) => {
            console.log(e);
            res.sendStatus(500);
        }
    }

    console.log('---- End POST request - Path: "/userorders"')
}

module.exports = { routeHandlerFunction };