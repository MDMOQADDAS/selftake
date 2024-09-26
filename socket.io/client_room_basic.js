import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import * as monaco from "monaco-editor";

function Room() {
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [msg, setMsg] = useState("default");
  const [editor, setEditor] = useState(null);
  const [updatedCode, setupdatedCode] = useState(null);

  useEffect(() => {
    if (roomId) {
      const newSocket = io("ws://localhost:3001");
      setSocket(newSocket);

      newSocket.emit("room", roomId);

      newSocket.on("msg", (msg) => {
        setMsg(msg);
      });

      newSocket.on("codeUpdate", (updatedCode) => {
        console.log(updatedCode)
        setupdatedCode(updatedCode)
      });

      return () => newSocket.disconnect();
    }
  }, [roomId]);

  useEffect(() => {
    if (socket) {
      const newEditor = monaco.editor.create(document.getElementById("editor"), {
        value: "Write code here //",
        language: "python"
      });

      setEditor(newEditor);

      newEditor.onDidChangeModelContent(() => {
        const code = newEditor.getValue();
        socket.emit("code", { roomId, code });

       
      });
      return () => newEditor.dispose();
    }
  }, [socket, roomId]);

  function handleRoomSubmit(event) {
    event.preventDefault();
    const newRoomId = event.target.elements.room.value;
    setRoomId(newRoomId);
  }

  return (
    <div>
      <form onSubmit={handleRoomSubmit}>
        <label>Enter the room id : </label>
        <input name="room" type="text" />
        <input type="submit" />
      </form>

      <p>{msg}</p>

      <p>{updatedCode}</p>

      <div id="editor" style={{ height: "100vh", border: "1px solid red" }}></div>
    </div>
  );
}

export default Room;
