import mongoose from "mongoose";

mongoose.connect("mongodb+srv://anshumaan:SonOfABitch%405@cluster0.ku1t2.mongodb.net/")

//user schema
const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String
})
export const UserModel = mongoose.model("User", UserSchema);

//content schema 
const ContentSchema = new mongoose.Schema({
    type: String,
    link: String,
    title: String,
    tags: [{type: mongoose.Types.ObjectId, ref: "Tag"}],
    //or tags:{types: [mongoose.Types.ObjectId], ref: "Tag"}
    userId: {type: mongoose.Types.ObjectId, ref: "User"}
})
export const ContentModel = mongoose.model("Content", ContentSchema);

//link schema
const LinkSchema = new mongoose.Schema({
    hash: String,
    userId: {type: mongoose.Schema.ObjectId, ref: "User", unique: true, required: true}
})
export const LinkModel = mongoose.model("Links", LinkSchema);