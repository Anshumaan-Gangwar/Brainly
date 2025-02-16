"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = userMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
function userMiddleware(req, res, next) {
    const token = req.headers["authorization"];
    if (token) {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_PASSWORD); // there is a chance token is undefined. 
        // you can add token as string to tell ts that token will come as an string only and will not be undefined
        if (decoded) {
            //@ts-ignore
            req.userId = decoded.id;
            next();
        }
        else {
            res.status(403).json({
                message: "You are not logged in"
            });
        }
    }
}
