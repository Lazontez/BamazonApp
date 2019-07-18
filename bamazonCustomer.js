// List a set of menu options:
//require mysql and inquirer
var mysql = require("mysql");
var inquirer = require("inquirer");

//Use inquirer to set up question prompt asking the user if they'd want to 
inquirer.prompt(
    {
        name: "openingAction",
        type: "list",
        messagae: "What would you like to do?",
        choices: ["View products for sale", "View Low Inventory", "Add to inventory", "Add new product"]

    }
).then(function (response) {
    var openingAction = response.openingAction;

    switch (openingAction) {

        case "View products for sale":
            return viewAllProducts();
            break;

        case "View Low Inventory":
            return viewLowInventoryy()
            break;

        case "Add to inventory":
            return addToInventory()
            break;

        case "Add new product":
            return addNewProduct()
            break;
    }
})


//   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

// If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

//list every available item: the item IDs, names, prices, and quantities.
function viewAllProducts() {
    //Spark a connection witg mysql stored in a conncetion variable
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

    //make a query call and select * from products and display the items id, name prices, and quantity

    connection.query("SELECT * FROM products", function (error, res) {
        console.log("\n")

        for (v = 0; v < res.length; v++) {
            var item_id = res[v].item_id;
            var item_name = res[v].product_name;
            var quantity = res[v].stock_quantity;
            var cost = res[v].price;
            console.log("| ID:  " + item_id + " | Product Name: " + item_name + " | Quantity: " + quantity + " | Cost: $" + cost + " |")
            console.log("\n")
        }
    });
    connection.end()
}

function viewLowInventoryy() {
    //Spark a connection witg mysql stored in a conncetion variable
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
    var numberOfLow = 0
    console.log("\n LOW INVENTORY ITEMS")
    console.log("\n")
    connection.query("SELECT * FROM products", function (error, res) {
        // console.log(res)
        for (z = 0; z < res.length; z++) {
            var stock_quantity = res[z].stock_quantity;
            // console.log(typeof(stock_quantity)+" "+stock_quantity)
            
            if (stock_quantity<= 5) {
                var item_id = res[z].item_id;
                var item_name = res[z].product_name;
                var quantity = res[z].stock_quantity;
                var cost = res[z].price;
                console.log("| ID:  " + item_id + " | Product Name: " + item_name + " | Quantity: " + quantity + " | Cost: $" + cost + " |")
                console.log("\n")
                numberOfLow++;
            }
            
        }
        if(numberOfLow==0){
            console.log("No Low Inventory Items")
        }
    });connection.end()

}

function addToInventory() {
    console.log("yessir")

}

function addNewProduct() { }