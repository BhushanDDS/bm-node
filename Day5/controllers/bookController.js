import { books, authors, genres } from "../db/objDemoDb.js";
import { parseBody } from "../utils/parsebody.js";

export const getBooks = (req, res) => {
    const result = books.map(book => {
        const author = authors.find(a => a.id === book.author_id);
        const genre = genres.find(g => g.id === book.genre_id);
        return {
            ...book,
            author: author ? author.name : "Unknown",
            genre: genre ? genre.name : "Unknown"
        };
    });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
};

export const createBook = async(req, res) => {
    try {
        const body = await parseBody(req);
        const { title, author_id, genre_id } = body;
        const newBook = { id: books.length + 1, title, author_id, genre_id };
        books.push(newBook);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newBook));
    } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err }));
    }
};



export const updateBook = async(req, res) => {
    const segments = req.url.split("/");
    const id = parseInt(segments[2]);

    const book = books.find(b => b.id === id);
    if (!book) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Book not found" }));
    }

    try {
        const body = await parseBody(req);
        book.title = body.title || book.title;
        book.author_id = body.author_id || book.author_id;
        book.genre_id = body.genre_id || book.genre_id;

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(book));
    } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid body" }));
    }
};


export const deleteBook = (req, res) => {
    const segments = req.url.split("/");
    const id = parseInt(segments[2]);

    const index = books.findIndex(b => b.id === id);
    if (index === -1) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Book not found" }));
    }

    books.splice(index, 1);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Book deleted successfully" }));
};