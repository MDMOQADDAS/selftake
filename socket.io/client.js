import { useEffect, useState } from "react";
import { io } from "socket.io-client"
import * as monaco from "monaco-editor"


function Room() {
    const [socket, setSocket] =  useState(null)
    const [roomId, setRoomId] =  useState(null)
    const [msg, setmsg] =  useState("default")


    useEffect(() => {
        //monaco editor
        const editor = monaco.editor.create(document.getElementById("editor"))

        function handleEditorTextChange() {
            const editorValue = editor.getValue()
            // console.log(editorValue)
        }

        editor.onDidChangeModelContent(handleEditorTextChange)        
    })

    
    function handleRoomSubmit(event){
        event.preventDefault()
        const roomId = event.target.elements.room.value
        setRoomId(roomId)

        const socket = io("ws://localhost:3001");
        setSocket(socket);

        socket.on("connect", () => {
            console.log("connected") //connected
        })

        socket.emit("room", roomId)

        socket.on("roomMessage", (msg) => {
                setmsg(msg)
        })
    }



    return (
        <div>
            <form onSubmit={handleRoomSubmit}>
                <label>Enter the room id : </label>
                <input name="room" type="text" />
                <input type="submit"/>
            </form>

            <p>{msg}</p>

            <p id="editor" style={{ height: "100vh" }}></p>
        </div>
    )
}

export default Room


// socket.emit('joinRoom', 'abcdef') //sending the id to join in the room

// socket.on("roomMessage", (msg) => {
//     alert(msg)
// })
