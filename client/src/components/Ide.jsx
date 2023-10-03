import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import Styles from "../styles/ide.module.css"
import socket from "../Socket";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
export default function Ide() {
 
  const [inputText, setinputText] = useState("console.log('hello world!');")
  const params=useParams();
  const onChange = React.useCallback((value, viewUpdate) => {
    const data={
      value:value,
      roomId:params.roomId
    }
    socket.emit("changeValue",data)
  }, []);
  useEffect(() => {
    socket.on("reciveValue",data=>{
      setinputText(p=>data)
    })

  }, [])
  return (
    <div className={Styles.container}>
      <CodeMirror
        value={inputText}
        height="100vh"
        theme="dark"
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
      />
     
    </div>
  );
}
