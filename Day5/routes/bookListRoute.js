import { listAllBooks } from "../controllers/bookListController.js";


export const bookListRouter = (req, res) => {
    if (req.method === "GET" && req.url === "/books/list") {
        listAllBooks(req, res);
        return true;
    }
    return false;
};