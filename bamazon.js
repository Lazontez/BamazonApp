

var mysql = require("mysql");
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Lazontez2780",
    database: "bamazon_db"
});

inititalizeApp()
//start the app
function inititalizeApp() {
    showAllProducts()
}

function showAllProducts() {
    //connect to mysql database and make a query call  to select all the data from the products table and run a loop
    //through that and log the name of the product,products Id, and the price.
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (v = 0; v < res.length; v++) {
            var product_name = res[v].product_name
            var product_id = res[v].item_id
            var product_price = res[v].price
            var product_quantity = res[v].stock_quantity
            console.log("\n --------------------------")
            console.log("Item_ID: " + product_id + "\n Product Name: " + product_name + "\n Price: $" + product_price + "\n" + product_quantity + " Left in stock");

        };
        //End the connection and run the userPrompt function with 3 variables being passed through
        connection.end(function () {
            userPrompt();
        })
    })




}
function userPrompt() {
    inquirer.prompt([
        {
            type: "number",
            message: "Type in the products ID of the item you would like to buy.",
            name: "idPrompt"
        }, {
            type: "number",
            message: "How many units would you like to buy?",
            name: "orderAmount"
        },
    ]).then(function (response) {

        var idSearch = response.idPrompt
        var orderAmount = response.orderAmount
        connectToQueryForIdMatch(idSearch, orderAmount)
    })

}

function connectToQueryForIdMatch(idSearch, orderAmount) {
    //set a variable to connect to mysql database
    var connection = mysql.createConnection({
        host: "localhost",

        // Your port; if not 3306
        port: 3306,

        // Your username
        user: "root",

        // Your password
        password: "Lazontez2780",
        database: "bamazon_db"
    });
    //make a query call and select all data from the products table then store that in a variable called data
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        // console.log(typeof(data.item))
        //Run a loop through the data
        for (v = 0; v < data.length; v++) {
            // console.log('working')
            //check to see if the id searched is equal to the data and if th stock quantity is greater than the order amount
            if (parseFloat(idSearch) == data[v].item_id && data[v].stock_quantity > orderAmount) {
                console.log("\n calculating........ \n")
                var updatedQuantity = data[v].stock_quantity - orderAmount
                var price = data[v].price;
                var total = parseFloat(price) * parseFloat(orderAmount);
                connection.query("UPDATE products SET stock_quantity = ? WHERE item_id=?",
                    [updatedQuantity, idSearch],
                    function (err, res) {
                        console.log("Your total is $" + total)
                        endConnectionandExit(connection);
                    }

                )
            }
            //check to see if the id searched is equal to the products table id but the quantity is not enough
            else if (parseFloat(idSearch) == data[v].item_id && data[v].stock_quantity < orderAmount) {
                console.log("\n Sorry we do not have " + orderAmount + " units of this product left. \n Current Stock = " + data[v].stock_quantity);
                console.log("try again goodbye....")

                endConnectionandExit(connection);
                // inititalizeApp()
            }
        }
    })
}
//End connection to mysql with a parameter for the connection properties
function endConnectionandExit(connection) {
    connection.end()
}

