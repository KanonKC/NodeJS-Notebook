export interface NotebookCell {
  language: "markdown" | "javascript"
  source: string[]
  outputs?: any[]
}

export interface NotebookData {
  cells: NotebookCell[]
}
