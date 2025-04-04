import { books, authors, genres } from "../db/objDemoDb.js";

export const listAllBooks = (req, res) => {
    const result = books.map(book => {
        const author = authors.find(a => a.id === book.author_id);
        const genre = genres.find(g => g.id === book.genre_id);

        return {
            id: book.id,
            title: book.title,
            author: author ? author.name : "Unknown",
            genre: genre ? genre.name : "Unknown"
        };
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
};