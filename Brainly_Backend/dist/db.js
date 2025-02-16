"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.ContentModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb+srv://anshumaan:SonOfABitch%405@cluster0.ku1t2.mongodb.net/");
//user schema
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, unique: true },
    password: String
});
exports.UserModel = mongoose_1.default.model("User", UserSchema);
//content schema 
const ContentSchema = new mongoose_1.default.Schema({
    type: String,
    link: String,
    title: String,
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: "Tag" }],
    //or tags:{types: [mongoose.Types.ObjectId], ref: "Tag"}
    userId: { type: mongoose_1.default.Types.ObjectId, ref: "User" }
});
exports.ContentModel = mongoose_1.default.model("Content", ContentSchema);
//link schema
const LinkSchema = new mongoose_1.default.Schema({
    hash: String,
    userId: { type: mongoose_1.default.Schema.ObjectId, ref: "User", unique: true, required: true }
});
exports.LinkModel = mongoose_1.default.model("Links", LinkSchema);
