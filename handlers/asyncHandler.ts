import { NextFunction, Request, Response } from "express";
import { AppError } from "./errorHandler";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

interface CustomRequest extends Request{
    uid?:string
}

export default function asyncHandler(dependent:(req:CustomRequest,res:Response,next:NextFunction)=>Promise<any>){
    return async function (req:CustomRequest,res:Response,next:NextFunction) {
        try {
            await dependent(req,res,next);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.status).json({error:error.message})
            }
            if (error instanceof TokenExpiredError) {
                return res.status(400).json({ token_expired: "Token is expired" });
            }
            if (error instanceof JsonWebTokenError) {
                return res.status(400).json({ error: "bad request" })
            }
            return res.status(500).json({error:error})
        }
    }
}