import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel, ContentModel, LinkModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";
import { hashGenerator } from "./util";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/signup", async(req, res) => {
    //zod validation and hashing the password
    const username = req.body.username;
    const password = req.body.password

    try{
        await UserModel.create({
        username: username,
        password: password
        })

        res.json({
            messege: "Data entry is done"
        })
    }catch(e){
        // console.log(e);
        res.status(411).json({
            messege: "Duplicate entry"
        })
    }

})
app.post("/api/v1/signin", async (req: Request, res: Response) => {
    //jwt token 
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await UserModel.findOne({
        username: username,
        password: password
    })

    if(existingUser){
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD)
        // console.log(existingUser);
        res.json({
            token,
        })
    }else{
        res.status(500).json({
            messege: "internal server error"
        })
    }


})
//adding content
app.post("/api/v1/content", userMiddleware, (req, res)=>{
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    ContentModel.create({
        link,
        type,
        title,
        tags: [],
        //@ts-ignore
        userId: req.userId
    })
    res.json({
        messege: "content added"
    })
})
//getting the content for the user
app.get("/api/v1/content", userMiddleware, async (req, res)=>{
    //@ts-ignore
    const userId = req.userId
    const content = await ContentModel.find({
        userId: userId
    })
    res.json({
        contents: content
    })
})
//deleting content 
app.delete("/api/v1/content", async (req, res)=>{
    const contentId = req.body.contentId
    await ContentModel.deleteMany({
        _id : contentId
    })
    res.json({
        content: contentId
    })
})
app.post("/api/v1/share", userMiddleware, async(req, res)=>{
    console.log("hello world");
    const share = req.body.share;
    if(share == true){
        //@ts-ignore
        const existingLink = await LinkModel.findOne({userId: req.userId})
        if(existingLink){
            res.json({hash : existingLink.hash})
            return
        }
        const hash = hashGenerator();
        //@ts-ignore
        await LinkModel.create({hash, userId: req.userId});
        res.json({
            hash
        })
    }else{
        //@ts-ignore
        await LinkModel.deleteOne({userId: req.userId})
        res.json({messege: "share link deleted"})
    }

})
app.get("api/v1/:shareLink", async (req, res)=>{  //:shareLink means params
    console.log("hello");
    const hash = req.params.shareLink;
    const link = await LinkModel.findOne({hash});
    if(!link){
        res.status(404).json({messege: "link not found"});
        return;
    }
    const content = await ContentModel.find({userId: link.userId});
    const user = await UserModel.findOne({_id: link.userId});
    if(!user){
        res.status(404).json({messege: "user not found"});
        return
    }
    res.json({
        user: user.username,
        content
    })
})


app.listen(3000);