const http = require("node:http");

const server = http.createServer((req, res) => {

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end("hello world")


})


const port = 3000;
server.listen(port, () => {
    console.log("Server started ");

})