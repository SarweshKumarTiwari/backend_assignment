import {Router} from "express";
import { 
    deleteBookInfo,
    getBookInfo,
    insertBook, 
    updateBookInfo
} from "../controllers/books.controller";
import { authenticate } from "../controllers/user.controller";

const bookRoutes=Router();

bookRoutes.post('/books/insertbook',authenticate,insertBook);
bookRoutes.delete('/books/deletebook/:id',authenticate,deleteBookInfo);
bookRoutes.put('/books/updatebook',authenticate,updateBookInfo);
bookRoutes.get('/books/getbooks',getBookInfo)

export default bookRoutes;