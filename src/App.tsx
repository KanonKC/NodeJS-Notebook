import { useState } from "react"
import { Notebook } from "./components/Notebook"
import { Sidebar } from "./components/Sidebar"
import { chapters } from "./data"
import type { NotebookData } from "./types/notebook"
import { Menu } from "lucide-react"

function App() {
  const [activeChapterId, setActiveChapterId] = useState(chapters[0].id)
  const activeChapter = chapters.find(c => c.id === activeChapterId) || chapters[0]

  return (
    <div className="min-h-screen bg-background flex font-sans selection:bg-orange-500/20 selection:text-orange-900">
      <Sidebar
        activeChapterId={activeChapterId}
        onSelectChapter={setActiveChapterId}
      />

      <div className="flex-1 flex flex-col h-screen overflow-y-auto scroll-smooth">
        <header className="lg:hidden border-b border-zinc-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/20">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <h1 className="font-bold text-lg text-zinc-900 tracking-tight">Node Notebook</h1>
          </div>
          <button className="p-2 rounded-lg bg-white border border-zinc-200 text-zinc-500">
            <Menu className="w-5 h-5" />
          </button>
        </header>

        <main className="flex-1">
          <div className="max-w-4xl mx-auto pt-12 pb-24 px-6">
            <div className="mb-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-[10px] uppercase tracking-wider">
                Chapter {chapters.findIndex(c => c.id === activeChapterId) + 1}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight leading-tight">
                {activeChapter.title.split('. ')[1]}
              </h1>
              <p className="text-zinc-600 text-lg max-w-2xl leading-relaxed">
                เรียนรู้ JavaScript และ Node.js พื้นฐานแบบ Interactive ในรูปแบบ Notebook ที่คุณสามารถแก้ไขและรันโค้ดได้ทันที
              </p>
            </div>

            <Notebook data={activeChapter.data as NotebookData} key={activeChapterId} />
          </div>
        </main>

        <footer className="border-t border-zinc-100 py-12 text-center bg-stone-50/50">
          <p className="text-sm text-zinc-400 font-medium tracking-wide">
            © 2026 NNB-Front • Built with React & Monaco Editor
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
