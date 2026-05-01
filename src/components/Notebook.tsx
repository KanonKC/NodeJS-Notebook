import React from "react"
import type { NotebookData } from "@/types/notebook"
import { NotebookCell } from "./NotebookCell"

interface NotebookProps {
  data: NotebookData
}

export const Notebook: React.FC<NotebookProps> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto py-10">
      {data.cells.map((cell, index) => (
        <NotebookCell
          key={index}
          language={cell.language}
          source={cell.source}
          initialOutputs={cell.outputs}
        />
      ))}
    </div>
  )
}
