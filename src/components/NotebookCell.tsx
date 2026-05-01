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

  // Handle OUTPUT text
  if (language === "markdown") {
    const content = source.join("")
    if (content.startsWith("**OUTPUT**")) {
      const outputValue = content.replace("**OUTPUT**", "").trim().replace(/`/g, "")
      return (
        <div className="mb-10 p-6 bg-white border border-dashed border-stone-200 rounded-2xl shadow-sm">
          <div className="text-[10px] uppercase tracking-widest text-orange-600 mb-3 bg-orange-50 w-fit px-2 py-0.5 rounded">Expected Output</div>
          <div className="font-mono text-sm text-zinc-600 break-all leading-relaxed">
            {outputValue}
          </div>
        </div>
      )
    }

    return (
      <div className="prose prose-zinc max-w-none mb-10 py-2 font-medium">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    )
  }

  return (
    <div className="mb-10 border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-xl shadow-stone-200/50">
      <div className="flex items-center justify-between px-6 py-3 bg-stone-50 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-400" />
          <span className="text-xs text-zinc-500 uppercase tracking-wider">JavaScript Runner</span>
        </div>
        <button
          onClick={runCode}
          className="flex items-center gap-2 px-4 py-1.5 text-xs text-white bg-zinc-900 rounded-full hover:bg-zinc-800 transition-all active:scale-95 shadow-md shadow-zinc-900/10"
        >
          <Play className="w-3 h-3 fill-white" />
          Run Code
        </button>
      </div>
      <div className="font-mono text-sm">
        <Editor
          height="240px"
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
            padding: { top: 20, bottom: 20 },
            fixedOverflowWidgets: true,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          }}
        />
      </div>
      {output.length > 0 && (
        <div className="p-6 bg-zinc-900 font-mono text-xs text-zinc-300">
          <div className="text-zinc-500 mb-3 uppercase text-[10px] tracking-wider font-bold border-b border-zinc-800 pb-2">Console Output</div>
          {output.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap mb-1.5 last:mb-0 leading-relaxed">{line}</div>
          ))}
        </div>
      )}
    </div>
  )
}
