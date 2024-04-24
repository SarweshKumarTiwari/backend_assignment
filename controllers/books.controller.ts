import asyncHandler from "../handlers/asyncHandler";
import { AppError } from "../handlers/errorHandler";
import booksEntity from "../models/books.entity";

type queryType={
    published?:string
    author?:string
}

export const insertBook=asyncHandler(async (req,res) => {
    const body=req.body;
    if (!(body.title&&body.author&&body.published)) {
        throw new AppError("Some fields are empty please check",400)
    }
    const book=await new booksEntity(body).save();
    res.status(201).json({success:{
        message:"book inserted",
        data:book
    }})
})

export const deleteBookInfo=asyncHandler(async (req,res) => {
    const bookId=req.params.id;
    if (!bookId) {
        throw new AppError("book id not found",400)
    }
    const book=await booksEntity.findByIdAndDelete(bookId);
    res.status(200).json({success:{
        message:"book deleted",
        data:book
    }})
})

export const updateBookInfo=asyncHandler(async (req,res) => {
    const body=req.body;
    if (!body.id) {
        throw new AppError("no book id given",400)
    }
    const id=body.id;
    body.id=undefined;
    if (!(body.title||body.author||body.published)) {
        throw new AppError("No field is given to update please check!",400)
    };
    const book=await booksEntity.findByIdAndUpdate(id,body);
    res.status(200).json({success:{
        message:"book updated",
        data:book
    }})
})

export const getBookInfo=asyncHandler(async (req,res) => {
    const published=req.query.published;
    const author=req.query.author;
    const query:queryType={};
    if (published) {
        query.published=published as string;
    }
    if (author) {
        query.author=author as string
    }
    const books=await booksEntity.find(query);
    res.status(200).json({success:{
        message:"books found",
        data:books
    }})
})