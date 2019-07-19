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

            if (stock_quantity <= 5) {
                var item_id = res[z].item_id;
                var item_name = res[z].product_name;
                var quantity = res[z].stock_quantity;
                var cost = res[z].price;
                console.log("| ID:  " + item_id + " | Product Name: " + item_name + " | Quantity: " + quantity + " | Cost: $" + cost + " |")
                console.log("\n")
                numberOfLow++;
            }

        }
        if (numberOfLow == 0) {
            console.log("No Low Inventory Items")
        }
    }); connection.end()

}

function addToInventory() {
    //connect to the mysql database 
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
    //ask the user which item they would like to add inventory to
    inquirer.prompt([
        {  
            type:"input",
            name:"id",
            message:"Enter the ID of the item"     

        },
        {
            type:"number",
            name:"amountToAdd",
            message:"How many units would you like to add?"

        }
    //after we get the data from that store that in a variable called res
    ]).then(function(res){
        
        var idToAddTo = res.id;
        var amountToAdd = res.amountToAdd;

        connection.query("SELECT * from products WHERE item_id = ?",[idToAddTo], function(err,response){
            if (err) throw err;
            var currentStockQuantity = response[0].stock_quantity;
            var newAmount = currentStockQuantity + amountToAdd;
            console.log("adding to database........")
            connection.query("UPDATE products SET stock_quantity = ? WHERE item_id=?",[newAmount,idToAddTo], function(err,res){
                console.log("This item now has "+newAmount+" units in stock.")
            })
        })



        
    })
    // connection.end()
}

function addNewProduct() {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "Lazontez2780",
        database: "bamazon_db"
    })
    //GET users input on what they would like to add 
    inquirer.prompt([
        {
            type: "input",
            message: "What is the products name you wish to add?",
            name: "productName"
        }, {
            type: "list",
            message: "Which category best fits this product?",
            choices: ["Electronics", "Clothing", "Furniture", "Collectebles", "Art"],
            name: "category"
        }, {
            type: "input",
            message: "Enter the dollar amount of product (ex. 20.00 , 83.45)",
            name: "price"
        }, {
            type: "number",
            message: "How many units of this item are there in stock?",
            name: "stockAmount"

        }
    ]).then(function (res) {
        var newProduct_Name = res.productName;
        var newProduct_category = res.category;
        var newProduct_Price = parseFloat(res.price);
        var newProduct_Stock = res.stockAmount;
        connection.query("INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES(?,?,?,?)",
            [newProduct_Name, newProduct_category, newProduct_Price, newProduct_Stock]
            ,
            function (err, data) {
                // console.log(data)
                console.log("New Product has been Added......")

            })
        // viewAllProducts()

    }); connection.end()

};