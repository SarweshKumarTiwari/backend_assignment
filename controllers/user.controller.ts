import asyncHandler from "../handlers/asyncHandler";
import { AppError } from "../handlers/errorHandler";
import { isStrongPassword,isEmail} from "validator";
import usersEntity from "../models/users.entity";
import jwt, { JwtPayload } from "jsonwebtoken"
import { CookieOptions } from "express";

interface payload extends JwtPayload{
    id:string
}
const cookieOptions:CookieOptions={
    httpOnly:true,
    path:'/'
}

export const registerUser=asyncHandler(async (req,res)=>{
    const body=req.body
    if (!(body.name&&body.email&&body.password)) {
        throw new AppError("Please provide given params",400)
    }
    if (!isStrongPassword(body.password)||!isEmail(body.email)) {
        throw new AppError("Your password is not strong or email is not valid",400)
    }
    if (await usersEntity.findOne({email:body.email})) {
        throw new AppError("user already exists",400)
    }
    const user=await new usersEntity(body).save();
    const access_token=user.accessToken();
    const refresh_token=user.refreshToken();
    await usersEntity.findByIdAndUpdate(user._id,{refresh_token:refresh_token})
    res.cookie("access_token",access_token,cookieOptions);
    res.cookie("refresh_token",refresh_token,cookieOptions);
    res.status(200).json({success:"user registered successfully"})
});

export const authorise=asyncHandler(async (req,res)=>{
    const body=req.body;
    if (!(body.email&&body.password)) {
        throw new AppError("No email or password provided",400);
    }
    const user=await usersEntity.findOne({email:body.email});
    if (!user) {
        throw new AppError("No user found",400)
    }
    if (!await user.compare(body.password)) {
        throw new AppError("password incorrect",400)
    }
    const access_token=user.accessToken();
    const refresh_token=user.refreshToken();
    await usersEntity.findByIdAndUpdate(user._id,{refresh_token:refresh_token})
    res.cookie("access_token",access_token,cookieOptions);
    res.cookie("refresh_token",refresh_token,cookieOptions);
    res.status(200).json({success:"user logged"});
});

export const authenticate=asyncHandler(async (req,res,next) => {
    if (!req.cookies.access_token) {
        throw new AppError("No token bad request",400);
    }
    req.uid=(jwt.verify(req.cookies.access_token,process.env.ACCESS_TOKEN as string)as payload).id;
    next();
})

export const getAccessToken=asyncHandler(async (req,res)=>{
    if (!req.cookies.refresh_token) {
        throw new AppError("No token bad request",400);
    }
    const id=(jwt.verify(req.cookies.refresh_token,process.env.REFRESH_TOKEN as string) as payload).id;
    const user=await usersEntity.findById(id).select("refresh_token");
    if (!user) {
        throw new AppError("no user exists",400)
    }
    if (user.refresh_token!==req.cookies.refresh_token) {
        await usersEntity.findByIdAndUpdate(id,{refresh_token:""});
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        throw new AppError("bad Request",400)
    }
    const access_token=user.accessToken();
    const refresh_token=user.refreshToken();
    await usersEntity.findByIdAndUpdate(user._id,{refresh_token:refresh_token})
    res.cookie("access_token",access_token,cookieOptions);
    res.cookie("refresh_token",refresh_token,cookieOptions);
    res.status(200).json({success:"genreated access token"})
});

export const getLoggedUser=asyncHandler(async (req,res) => {
    if (!req.uid) {
        throw new AppError("User not authentic",400)
    }
    const user=await usersEntity.findById(req.uid).select("-password -refresh_token")
    res.status(200).json({success:user})
})

export const logoutUser=asyncHandler(async (req,res) => {
    if (!req.uid) {
        throw new AppError("User not authentic",400)
    }
    await usersEntity.findByIdAndUpdate(req.uid,{refresh_token:""});
    res.clearCookie("refresh_token");
    res.clearCookie("access_token");
    res.status(200).json({success:"logged out"})
})

export const deleteUser=asyncHandler(async (req,res) => {
    
})
