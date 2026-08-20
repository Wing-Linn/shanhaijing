import { BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-paper-200/50 border-t border-paper-300/50 py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 seal-stamp text-lg rounded-lg">
            山
          </div>
          <span className="font-serif text-xl font-bold text-ink-700 tracking-wider">
            山海经
          </span>
        </div>
        <p className="text-sm text-ink-400 font-serif mb-2">
          上古奇书 · 地理志异 · 神话渊薮
        </p>
        <p className="text-xs text-ink-400 font-serif">
          全书十八篇 · 山经五篇 · 海经八篇 · 大荒经四篇 · 海内经一篇
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-ink-400">
          <BookOpen className="w-3 h-3" />
          <span>致敬中华上古文明</span>
        </div>
      </div>
    </footer>
  );
}
