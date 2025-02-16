import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {JWT_PASSWORD} from "./config";
import { getConfigFileParsingDiagnostics } from "typescript";
import mongoose from "mongoose";

export function userMiddleware(req: Request, res: Response, next: NextFunction){
    const token = req.headers["authorization"];
    if(token){
        const decoded = jwt.verify(token, JWT_PASSWORD)  // there is a chance token is undefined. 
        // you can add token as string to tell ts that token will come as an string only and will not be undefined
        if(decoded){
            //@ts-ignore
            req.userId = decoded.id;
            next();
        }else{
        res.status(403).json({
                message: "You are not logged in"
            })
        }
    }
    
}

