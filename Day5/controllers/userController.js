import { users } from "../db/objDemoDb.js";
import { parseBody } from "../utils/parsebody.js";

export const getUsers = (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
};

export const createUser = async(req, res) => {
    const body = await parseBody(req);
    const newUser = { id: users.length + 1, ...body };
    users.push(newUser);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newUser));
};

export const updateUser = async(req, res) => {
    const id = parseInt(req.url.split("/")[2]);
    const user = users.find(u => u.id === id);

    if (!user) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "User not found" }));
    }

    const body = await parseBody(req);
    user.name = body.name || user.name;
    user.email = body.email || user.email;

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
};

export const deleteUser = (req, res) => {
    const id = parseInt(req.url.split("/")[2]);
    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "User not found" }));
    }

    users.splice(index, 1);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "User deleted successfully" }));
};