DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;
-- 2. Then create a Table inside of that database called `products`.
CREATE TABLE products(
item_id INT(250) AUTO_INCREMENT,
product_name VARCHAR(100),
department_name VARCHAR(240),
price DECIMAL(6,2),
stock_quantity INT(100),
PRIMARY KEY(item_id)
);
-- 4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Iphone X","Electronics",499.99,209);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Blue Nike Sweater","Clothing",45.50,46);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Dell Laptop","Electronics","325.00",30);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("VINYL RECORD PLAYER","Electronics",50.00,23);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Red Polo Shirt","Clothing",45.00,65);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Vintage Poster","Decorations",35.00,79);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Cool Sunglasses","Clothing",15.99,14);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Samsung 8","Electronics",300.99,100);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("CD Player","Electronics",35.00,65);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("Telescope","Electronics",85.50,208);

Select * FROM products;