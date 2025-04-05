/*
4. HTTP Server with Routes
Build a Node.js HTTP server that:
● Serves "Home Page" on /
● Serves "About Page" on /about
● Serves 404 on any other route
*/

const http = require("node:http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        serveFile("home.html", res);
    } else if (req.url === "/about") {
        serveFile("about.html", res);
    } else {
        serveFile("err.html", res);
    }
});

const serveFile = (filename, res) => {
    const filePath = path.join(__dirname, filename);

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/html" });
            res.end("<h1>500 - Internal Server Error</h1>");
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        }
    });
};



const port = 3000;
server.listen(port, () => {
    console.log(`server started on localhost:${port}`);

})