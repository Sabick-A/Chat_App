const express=require('express');
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const Chat=require("./models/chat.js");
const methodOverride=require('method-override');

main().then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("Home Page");
})


app.get("/chats",async (req,res)=>{
    let chats= await Chat.find({});
    res.render("home.ejs",{chats});
})

app.get("/chats/new",(req,res)=>{
    res.render("newChat.ejs");
})

app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    const chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

app.post("/chats",(req,res)=>{
    let{from,to,msg}=req.body;
    const newChat=new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date(),
        updated_at:new Date(),
    });
    newChat.save().then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    });
    res.redirect("/chats");
})
app.patch("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let {msg:newMsg} =req.body;
    let udate=new Date();
    const updatedChat= await Chat.findByIdAndUpdate(id,{msg:newMsg,updated_at:udate},{runValidators:true,new:true});
    console.log(updatedChat);
    res.redirect("/chats");
});

app.delete("/chats/:id",(req,res)=>{
    let {id}=req.params;
    Chat.findByIdAndDelete(id).then((res)=>{
        console.log("deletion done");
    }).catch((err)=>{
        console.log(err);
    })
    res.redirect("/chats");
})
app.listen(8080,()=>{
    console.log("Server listening on port 8080");
});