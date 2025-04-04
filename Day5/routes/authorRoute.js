import {
    getAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor,
} from "../controllers/authorController.js";

export const authorRoutes = (req, res) => {
    const method = req.method;
    const segments = req.url.split("/");

    if (segments[1] !== "authors") return false;

    if (method === "GET" && segments.length === 2) return getAuthors(req, res);
    if (method === "POST" && segments.length === 2) return createAuthor(req, res);
    if (method === "PUT" && segments.length === 3) return updateAuthor(req, res);
    if (method === "DELETE" && segments.length === 3) return deleteAuthor(req, res);

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Author route not found" }));
    return true;
};