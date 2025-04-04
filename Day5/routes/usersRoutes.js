import {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/userController.js";

export const userRoutes = (req, res) => {
    const method = req.method;
    const segments = req.url.split("/");

    if (segments[1] !== "users") return false;

    if (method === "GET" && segments.length === 2) return getUsers(req, res);
    if (method === "POST" && segments.length === 2) return createUser(req, res);
    if (method === "PUT" && segments.length === 3) return updateUser(req, res);
    if (method === "DELETE" && segments.length === 3) return deleteUser(req, res);

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "User route not found" }));
    return true;
};