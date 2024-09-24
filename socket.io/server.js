import { Server } from "socket.io";
import cors from "cors"

const io = new Server(3001,{
    cors: {
        origin: "http://localhost:3000"
    }
});


io.on("connection", (socket)=>{

  
    console.log("connected in socket " + socket.id)
    

    socket.on("room" , (roomId)=>{
        socket.join(roomId)
        console.log(`${socket.id } connected on room : ${roomId}`)

        io.to(roomId).emit("roomMessage", `hi mr ${roomId}`)
    })


    socket.on("disconnect", ()=>{
        console.log("disconnected")
    })

})








    // socket.on('joinRoom', (room)=>{  // receiving the id
    //     socket.join(room); // joining to the room
    //     console.log(`${socket.id} Joined Room ${room}`)
    //     io.to("abcdef").emit("roomMessage","for all client")
    // })
