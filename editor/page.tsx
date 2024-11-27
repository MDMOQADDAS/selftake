// this is the codemirror

"use client"
import React, { useEffect, useRef } from 'react'
import { EditorView, basicSetup } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"

export default function CodeMirror() {
  const editorContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editorContainerRef.current) {
      const editor = new EditorView({
        extensions: [
          basicSetup, 
          javascript(),
          EditorView.theme({
            '&':{
              height: "300px",
              width: "500px",
              border: "1px solid red"
            }
          })

        ],
        parent: editorContainerRef.current
      })
      return () => {
        editor.destroy()
      }
    }
  }, [])

  return (
    <div>
      <h1>CodeMirror Editor</h1>
      <div  ref={editorContainerRef} />
    </div>
  )
}

