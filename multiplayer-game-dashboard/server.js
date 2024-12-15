import { createServer } from "http";
import {Server} from "socket.io"
const httpServer=createServer();
const socket=new Server(httpServer,{
    cors:{
        origin:"http://localhost:5173",
    },
});

let playerScores=[]

socket.on("connection",(socket)=>{
    console.log(socket);
    socket.on("scores",(data)=>{
        console.log(data);
        playerScores.push({...data,id:socket.id});
        console.log(socket.id);
        console.log(playerScores);
        socket.emit("playerScores",playerScores);
        setInterval(()=>{
            socket.emit("playerScores",playerScores);
          },5000);
    });
   
})

httpServer.listen(3000,()=>{
    console.log("Server is running on port 3000");
})