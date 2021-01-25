const queryDB = require('../db/queryDB');

const routeHandlerFunction = async (req, res) => {
    console.log(`-------- GET request - Path: "/userorders" - Query:${JSON.stringify(req.query)}`);

    const user_id = req.query.user_id
    const myQuery = `
    SELECT 
    ORDERS.id, 
    ORDERS.order_id, 
    ORDERS.user_id,
    ORDERS.tree_id, 
    ORDERS.buying_date,
    TREES.tree_name, 
    TREES.tree_species, 
    TREES.country, 
    TREES.growth_rate, 
    TREES.price, 
    TREES.co2_emissions, 
    TREES.land_area, 
    TREES.tree_date, 
    TREES.tree_description, 
    TREES.tree_img_link
    FROM ORDERS INNER JOIN TREES ON ORDERS.tree_id=TREES.tree_id
    WHERE ORDERS.user_id=${user_id};`

    try {
        const results = await queryDB.queryData(myQuery);
        res.status(200);
        res.json(results);
    } catch {
        (e) => {
            console.log(e);
            res.sendStatus(500);
        }
    }

    console.log('---- End GET request - Path: "/userorders"')
}

module.exports = { routeHandlerFunction };