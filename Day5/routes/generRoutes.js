import {
    getGenres,
    createGenre,
    updateGenre,
    deleteGenre,
} from "../controllers/genereController.js";

export const genreRoutes = (req, res) => {
    const method = req.method;
    const segments = req.url.split("/");

    if (segments[1] !== "genres") return false;

    if (method === "GET" && segments.length === 2) return getGenres(req, res);
    if (method === "POST" && segments.length === 2) return createGenre(req, res);
    if (method === "PUT" && segments.length === 3) return updateGenre(req, res);
    if (method === "DELETE" && segments.length === 3) return deleteGenre(req, res);

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Genre route not found" }));
    return true;
};