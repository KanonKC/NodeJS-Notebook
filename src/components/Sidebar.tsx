import React from 'react';
import { chapters } from '@/data';
import { cn } from '@/lib/utils';
import { Coffee, BookOpen, Code2, Layers, Repeat, Zap } from 'lucide-react';

interface SidebarProps {
  activeChapterId: string;
  onSelectChapter: (id: string) => void;
}

const icons = [BookOpen, Layers, Code2, Repeat, Coffee, Zap];

export function Sidebar({ activeChapterId, onSelectChapter }: SidebarProps) {
  return (
    <aside className="w-80 h-screen sticky top-0 overflow-y-auto border-r border-zinc-200 bg-white/50 backdrop-blur-xl p-6 hidden lg:block">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
          <Coffee className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-zinc-900 tracking-tight">Node.js Learning</h1>
          <p className="text-xs text-zinc-400 font-medium uppercase tracking-widest">Notebook Edition</p>
        </div>
      </div>

      <nav className="space-y-1">
        {chapters.map((chapter, index) => {
          const Icon = icons[index] || BookOpen;
          const isActive = activeChapterId === chapter.id;

          return (
            <button
              key={chapter.id}
              onClick={() => onSelectChapter(chapter.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                isActive 
                  ? "bg-stone-100 text-orange-600 shadow-sm border border-stone-200" 
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-stone-50 border border-transparent"
              )}
            >
              <Icon className={cn(
                "w-4 h-4 transition-transform duration-200 group-hover:scale-110",
                isActive ? "text-orange-600" : "text-zinc-400 group-hover:text-zinc-600"
              )} />
              {chapter.title}
              
              {isActive && (
                <div className="absolute left-0 w-1 h-6 bg-orange-500 rounded-r-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* <div className="mt-10 p-4 rounded-2xl bg-gradient-to-br from-stone-50 to-stone-100 border border-stone-200">
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Progress</h3>
        <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden mb-3">
          <div 
            className="h-full bg-orange-500 transition-all duration-1000" 
            style={{ width: `${((chapters.findIndex(c => c.id === activeChapterId) + 1) / chapters.length) * 100}%` }}
          />
        </div>
        <p className="text-[10px] text-zinc-400 font-medium">
          Chapter {chapters.findIndex(c => c.id === activeChapterId) + 1} of {chapters.length} completed
        </p>
      </div> */}
    </aside>
  );
}
