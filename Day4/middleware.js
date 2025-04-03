const http = require("node:http");

let users = [
    { id: 1, name: "abc" },
    { id: 2, name: "ueue" }
];

// Middleware function to log request method and URL
const requestLogger = (req) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
};

const server = http.createServer((req, res) => {
    requestLogger(req); // Call the middleware to log request details

    if (req.method === "GET" && req.url.startsWith("/users")) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(users));
    } else if (req.method === "POST" && req.url === "/users") {
        let body = "";
        req.on("data", chunk => (body += chunk.toString()));
        req.on("end", () => {
            try {
                const newUser = JSON.parse(body);
                if (!newUser.name) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify({ error: "Name is required" }));
                }
                users.push({ id: users.length + 1, ...newUser });
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "User added successfully", users }));
            } catch (error) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Invalid JSON format" }));
            }
        });
    } else if (req.method === "DELETE" && req.url.startsWith("/users/delete/")) {
        const id = parseInt(req.url.split("/").pop());
        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            res.writeHead(404, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ error: "User not found" }));
        }

        users = users.filter(user => user.id !== id);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User deleted successfully", users }));
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Route not found" }));
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});