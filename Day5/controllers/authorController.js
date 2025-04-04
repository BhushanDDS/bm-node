import { authors } from "../db/objDemoDb.js";
import { parseBody } from "../utils/parsebody.js";

export const getAuthors = (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(authors));
};

export const createAuthor = async(req, res) => {
    const body = await parseBody(req);
    const newAuthor = { id: authors.length + 1, ...body };
    authors.push(newAuthor);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newAuthor));
};

export const updateAuthor = async(req, res) => {
    const id = parseInt(req.url.split("/")[2]);
    const author = authors.find(a => a.id === id);

    if (!author) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Author not found" }));
    }

    const body = await parseBody(req);
    author.name = body.name || author.name;

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(author));
};

export const deleteAuthor = (req, res) => {
    const id = parseInt(req.url.split("/")[2]);
    const index = authors.findIndex(a => a.id === id);

    if (index === -1) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Author not found" }));
    }

    authors.splice(index, 1);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Author deleted successfully" }));
};