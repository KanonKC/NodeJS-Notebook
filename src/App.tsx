import { Notebook } from "./components/Notebook"
import basicSyntaxData from "./data/basic-syntax.json"
import type { NotebookData } from "./types/notebook"

function App() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">N</span>
            </div>
            <h1 className="font-bold text-xl tracking-tight">NNB - Node Notebook</h1>
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            Part #1: Basic Syntax
          </div>
        </div>
      </header>
      
      <main>
        <Notebook data={basicSyntaxData as NotebookData} />
      </main>

      <footer className="border-t py-10 text-center text-sm text-muted-foreground">
        <p>© 2026 NNB-Front. Built for learning Node.js anywhere.</p>
      </footer>
    </div>
  )
}

export default App
