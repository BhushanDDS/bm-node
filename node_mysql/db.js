var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "NewPassword"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

// con.query("CREATE DATABASE mydb", function(err, result) {
//     if (err) throw err;
//     console.log("Database created");
// });

con.query("use  mydb", function(err, result) {
    if (err) throw err;
    console.log("using database");
});

var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
con.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Table created");
});

var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("1 record inserted");
});

con.query("SELECT * FROM customers", function(err, result, fields) {
    if (err) throw err;
    console.log(result);
});