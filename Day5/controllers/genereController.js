import { genres } from "../db/objDemoDb.js";
import { parseBody } from "../utils/parsebody.js";

export const getGenres = (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(genres));
};

export const createGenre = async(req, res) => {
    const body = await parseBody(req);
    const newGenre = { id: genres.length + 1, ...body };
    genres.push(newGenre);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newGenre));
};

export const updateGenre = async(req, res) => {
    const id = parseInt(req.url.split("/")[2]);
    const genre = genres.find(g => g.id === id);

    if (!genre) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Genre not found" }));
    }

    const body = await parseBody(req);
    genre.name = body.name || genre.name;

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(genre));
};

export const deleteGenre = (req, res) => {
    const id = parseInt(req.url.split("/")[2]);
    const index = genres.findIndex(g => g.id === id);

    if (index === -1) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Genre not found" }));
    }

    genres.splice(index, 1);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Genre deleted successfully" }));
};