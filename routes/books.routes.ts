import {Router} from "express";
import { 
    deleteBookInfo,
    getBookInfo,
    insertBook, 
    updateBookInfo
} from "../controllers/books.controller";

const bookRoutes=Router();

bookRoutes.post('/books/insertbook',insertBook);
bookRoutes.delete('/books/deletebook/:id',deleteBookInfo);
bookRoutes.put('/books/updatebook',updateBookInfo);
bookRoutes.get('/books/getbooks',getBookInfo)

export default bookRoutes;