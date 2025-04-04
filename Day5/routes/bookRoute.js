import {
    getBooks,
    createBook,
    updateBook,
    deleteBook,
} from "../controllers/bookController.js";

export const bookRoutes = (req, res) => {
    const method = req.method;
    const segments = req.url.split("/");

    if (segments[1] !== "books") return false;

    if (method === "GET" && segments.length === 2) return getBooks(req, res);
    if (method === "POST" && segments.length === 2) return createBook(req, res);
    if (method === "PUT" && segments.length === 3) return updateBook(req, res);
    if (method === "DELETE" && segments.length === 3) return deleteBook(req, res);

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Book route not found" }));
    return true;
};