// Then create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale.
//  Include the ids, names, and prices of products for sale.

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
            console.log("Item_ID: " + product_id + "\n Product Name: " + product_name + "\n Price: $" + product_price + "\n"+product_quantity+" Left in stock");

        };
        //End the connection and run the userPrompt function with 3 variables being passed through
        connection.end(function () {
            userPrompt();
        })
    })




}
function userPrompt(product_id, product_name, product_price, product_quantity) {
    inquirer.prompt([
        {
            type: "number",
            message: "Type in the products ID of the item you would like to buy.",
            name: "idPrompt"
        },{
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
            if (parseFloat(idSearch) == data[v].item_id && data[v].stock_quantity > orderAmount ) {
                // console.log("houston thats enuf")
            }
            //check to see if the id searched is equal to the products table id but the quantity is not enough
            else if (parseFloat(idSearch) == data[v].item_id && data[v].stock_quantity < orderAmount){                
                console.log("\n Sorry we do not have "+ orderAmount+" units of this product left. \n Current Stock = "+data[v].stock_quantity);
                endConnectionandExit(connection)
            }
        }
    })
}

function endConnectionandExit(connection){
    console.log("try again  goodbye....")
    connection.end()
}



// 6. The app should then prompt users with two messages.

//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.

// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.
