const {createServer} =require("http")
const {Server}=require("socket.io")

const httpServer=createServer();
const socket=new Server(httpServer,{
    cors:{
        origin:"http://127.0.0.1:5500",
    },
});

socket.on("connection",(socket)=>{
    console.log("User connected");
    console.log(socket);
    socket.emit("message","hello")
    socket.on("message",(message)=>{
        console.log(message);
    })
    socket.on("disconnect",()=>{
        console.log("User disconnected");
    })
})

httpServer.listen(3000,()=>{
    console.log("Server is running on port 3000");
})