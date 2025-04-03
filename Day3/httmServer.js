const http = require('node:http');


const users = [{ id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
]

const getDatafromBody = () => {
    return new Promise((res, rej) => {
        let body = "";
        req.on("data", chunk => {
            body += chunk.toString();
        });
        req.on("end", () => {
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject("Invalid JSON format");
            }
        });
        req.on("error", (err) => reject(err));
    })
}

const server = http.createServer(async(req, res) => {

    if (req.method == "GET" && req.url === "/users") {

        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify(users));

    } else if (req.method === "POST" && req.url === "/users") {
        try {
            const newUser = await getDatafromBody(req);
            newUser.id = users.length + 1;
            users.push(newUser);

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(users));
        } catch (error) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error }));
        }
    }





})

const port = 3000;
server.listen(port, () => {
    console.log(`server connected on ${port} on http://localhost:3000`);

})