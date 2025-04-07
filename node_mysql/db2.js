const mysql = require('mysql2/promise');

async function main() {
    let con;

    try {
        // 1. Create connection
        con = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "NewPassword"
        });
        console.log("Connected to MySQL!");

        // 2. Use database
        try {
            await con.query("USE mydb");
            console.log("Using database 'mydb'");
        } catch (dbErr) {
            console.error("Failed to use database 'mydb':", dbErr.message);
            return;
        }

        // 3. Create table (if not exists)
        const createTableSQL = `CREATE TABLE IF NOT EXISTS customers (
      name VARCHAR(255), 
      address VARCHAR(255)
    )`;

        try {
            await con.query(createTableSQL);
            console.log("Table 'customers' created or already exists");
        } catch (tableErr) {
            console.error("Error creating table:", tableErr.message);
        }

        // 4. Insert record
        const insertSQL = "INSERT INTO customers (name, address) VALUES (?, ?)";
        try {
            const [insertResult] = await con.query(insertSQL, ['Company Inc', 'Highway 37']);
            console.log(`Inserted record with ID: ${insertResult.insertId}`);
        } catch (insertErr) {
            console.error("Error inserting record:", insertErr.message);
        }

        // 5. Fetch all records
        try {
            const [rows] = await con.query("SELECT * FROM customers");
            console.log("Records fetched:");
            console.table(rows);
        } catch (selectErr) {
            console.error("Error fetching records:", selectErr.message);
        }

    } catch (connErr) {
        console.error("Failed to connect to MySQL:", connErr.message);
    } finally {
        if (con) {
            try {
                await con.end();
                console.log("Connection closed");
            } catch (closeErr) {
                console.error("Error closing connection:", closeErr.message);
            }
        }
    }
}

main();