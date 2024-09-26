import { Server } from "socket.io";
import cors from "cors"

const io = new Server(3001,{
    cors: {
        origin: "http://localhost:3000"
    }
});


io.on("connection", (socket)=>{
    var roomId;
  
    console.log("connected in socket " + socket.id)
    

    socket.on("room" , (roomId)=>{
        roomId=roomId;
        socket.join(roomId)
        console.log(`${socket.id } connected on room : ${roomId}`)

        io.to(roomId).emit("roomMessage", `hi mr ${roomId}`)
    })

    socket.on("code", ({roomId, code}) => {
        // console.log(`Recived msg in room ${roomId}`)
        // console.log(code)
        socket.to(roomId).emit("codeUpdate" , code) // this will send all who joined room expect sender

    })

   

    socket.on("disconnect", ()=>{
        console.log("disconnected")
    })

})
