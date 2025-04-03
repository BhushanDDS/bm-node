const http = require("node:http");

let users = [
    { id: 1, name: "abc" },
    { id: 2, name: "ueue" }
];

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/users") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(users));
    } else if (req.method === "POST" && req.url === "/users") {
        let body = "";
        req.on("data", chunk => {
            body += chunk.toString();
        });
        req.on("end", () => {
            const newUser = JSON.parse(body);
            users.push({ id: users.length + 1, ...newUser });
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "User added successfully", users }));
        });
    } else if (req.method === "DELETE" && req.url.startsWith("/users/delete/")) {
        const id = parseInt(req.url.split("/").pop());
        users = users.filter(user => user.id !== id);
        res.end(JSON.stringify(users));
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Route not found");
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});