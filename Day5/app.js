import http from "http";
import { bookRoutes } from "./routes/bookRoute.js";
import { authorRoutes } from "./routes/authorRoute.js";
import { userRoutes } from "./routes/usersRoutes.js";
import { genreRoutes } from "./routes/generRoutes.js";

const server = http.createServer(async(req, res) => {
    const handled = await bookRoutes(req, res);
    const handledAuthor = await authorRoutes(req, res);
    const handledUser = await userRoutes(req, res);
    const handledGenre = await genreRoutes(req, res);

    if (!handled) {

        if (!res.writableEnded) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Route not found" }));
        }
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(` Server running on http://localhost:${port}`);
});