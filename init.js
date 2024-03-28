const mongoose=require("mongoose");
const Chat=require("./models/chat.js");
main().then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

const chats=[
    {
    from:"Rajeev",
    msg:"Hi How are you",
    to:"Sitanshu",
    created_at:new Date(),
    updated_at:new Date(),
    },
    {
        from:"sony",
        msg:"lets study",
        to:"sourav",
        created_at:new Date(),
        updated_at:new Date(),
    },
    {
        from:"Ram",
        msg:"Lets go out",
        to:"sitanshu",
        created_at:new Date(),
        updated_at:new Date(),
    },
    {
        from:"Sony",
        msg:"Hey lets meet",
        to:"Sita",
        created_at:new Date(),
        updated_at:new Date(),
    },
    {
        from:"Tony",
        msg:"He is who i am searching for",
        to:"Sita",
        created_at:new Date(),
        updated_at:new Date(),
    },
];

Chat.insertMany(chats).then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
})