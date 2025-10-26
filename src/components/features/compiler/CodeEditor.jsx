import { useRef, useEffect } from "react";
import * as monaco from "monaco-editor";

export default function CodeEditor({ code, setCode, language }) {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = monaco.editor.create(editorRef.current, {
      value: code,
      language: language,
      theme: "vs-dark",
      automaticLayout: true,
    });

    editor.onDidChangeModelContent(() => setCode(editor.getValue()));

    return () => editor.dispose();
  }, [language]);

  return <div ref={editorRef} className="flex-1 border border-gray-700 rounded-md" style={{ height: "300px" }}></div>;
}
