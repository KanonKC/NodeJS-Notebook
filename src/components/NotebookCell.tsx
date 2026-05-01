import React, { useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import Editor from "@monaco-editor/react"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"

interface NotebookCellProps {
  language: "markdown" | "javascript"
  source: string[]
  initialOutputs?: any[]
}

export const NotebookCell: React.FC<NotebookCellProps> = ({
  language,
  source,
  initialOutputs = [],
}) => {
  const [code, setCode] = useState(source.join(""))
  const [output, setOutput] = useState<string[]>(
    initialOutputs.map((o) => JSON.stringify(o, null, 2))
  )

  const handleEditorBeforeMount = (monaco: any) => {
    monaco.editor.defineTheme("nnb-theme", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "", background: "09090b", foreground: "d4d4d8" },
        { token: "comment", foreground: "71717a", fontStyle: "italic" },
        { token: "keyword", foreground: "a855f7" },
        { token: "number", foreground: "22c55e" },
        { token: "string", foreground: "eab308" },
        { token: "operator", foreground: "6366f1" },
        { token: "function", foreground: "f97316" },
        { token: "entity.name.function", foreground: "f97316" },
      ],
      colors: {
        "editor.background": "#09090b",
        "editor.foreground": "#d4d4d8",
        "editorLineNumber.foreground": "#52525b",
        "editorLineNumber.activeForeground": "#a1a1aa",
        "editor.lineHighlightBackground": "#18181b",
        "editor.selectionBackground": "#3f3f46",
        "editorCursor.foreground": "#ffffff",
      },
    })
  }

  const runCode = () => {
    const logs: string[] = []
    const originalLog = console.log
    console.log = (...args: any[]) => {
      logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" "))
      originalLog(...args)
    }

    try {
      // Create a function from the code and execute it
      const result = new Function(code)()
      if (result !== undefined) {
        logs.push(`=> ${JSON.stringify(result)}`)
      }
    } catch (err: any) {
      logs.push(`Error: ${err.message}`)
    } finally {
      console.log = originalLog
      setOutput(logs)
    }
  }

  if (language === "markdown") {
    return (
      <div className="prose prose-zinc dark:prose-invert max-w-none mb-8 px-4 py-2">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{source.join("")}</ReactMarkdown>
      </div>
    )
  }

  return (
    <div className="mb-8 border rounded-lg overflow-hidden bg-zinc-950 shadow-lg">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b">
        <span className="text-xs font-mono text-zinc-400">JavaScript</span>
        <button
          onClick={runCode}
          className="flex items-center gap-2 px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 transition-colors"
        >
          <Play className="w-3 h-3" />
          Run
        </button>
      </div>
      <div className="font-mono text-sm">
        <Editor
          height="200px"
          defaultLanguage="javascript"
          language="javascript"
          defaultValue={code}
          theme="nnb-theme"
          beforeMount={handleEditorBeforeMount}
          onChange={(value) => setCode(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            fixedOverflowWidgets: true,
          }}
        />
      </div>
      {output.length > 0 && (
        <div className="p-4 bg-zinc-900 border-t font-mono text-xs text-zinc-300">
          <div className="text-zinc-500 mb-2 uppercase text-[10px] tracking-wider font-bold">Output</div>
          {output.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap mb-1">{line}</div>
          ))}
        </div>
      )}
    </div>
  )
}
