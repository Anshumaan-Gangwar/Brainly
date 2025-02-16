"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const util_1 = require("./util");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //zod validation and hashing the password
    const username = req.body.username;
    const password = req.body.password;
    try {
        yield db_1.UserModel.create({
            username: username,
            password: password
        });
        res.json({
            messege: "Data entry is done"
        });
    }
    catch (e) {
        // console.log(e);
        res.status(411).json({
            messege: "Duplicate entry"
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //jwt token 
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = yield db_1.UserModel.findOne({
        username: username,
        password: password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, config_1.JWT_PASSWORD);
        // console.log(existingUser);
        res.json({
            token,
        });
    }
    else {
        res.status(500).json({
            messege: "internal server error"
        });
    }
}));
//adding content
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    db_1.ContentModel.create({
        link,
        type,
        title,
        tags: [],
        //@ts-ignore
        userId: req.userId
    });
    res.json({
        messege: "content added"
    });
});
//getting the content for the user
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const content = yield db_1.ContentModel.find({
        userId: userId
    });
    res.json({
        contents: content
    });
}));
//deleting content 
app.delete("/api/v1/content", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    yield db_1.ContentModel.deleteMany({
        _id: contentId
    });
    res.json({
        content: contentId
    });
}));
app.post("/api/v1/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hello world");
    const share = req.body.share;
    if (share == true) {
        //@ts-ignore
        const existingLink = yield db_1.LinkModel.findOne({ userId: req.userId });
        if (existingLink) {
            res.json({ hash: existingLink.hash });
            return;
        }
        const hash = (0, util_1.hashGenerator)();
        //@ts-ignore
        yield db_1.LinkModel.create({ hash, userId: req.userId });
        res.json({
            hash
        });
    }
    else {
        //@ts-ignore
        yield db_1.LinkModel.deleteOne({ userId: req.userId });
        res.json({ messege: "share link deleted" });
    }
}));
app.get("api/v1/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hello");
    const hash = req.params.shareLink;
    const link = yield db_1.LinkModel.findOne({ hash });
    if (!link) {
        res.status(404).json({ messege: "link not found" });
        return;
    }
    const content = yield db_1.ContentModel.find({ userId: link.userId });
    const user = yield db_1.UserModel.findOne({ _id: link.userId });
    if (!user) {
        res.status(404).json({ messege: "user not found" });
        return;
    }
    res.json({
        user: user.username,
        content
    });
}));
app.listen(3000);
