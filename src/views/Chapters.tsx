import { useState } from 'react';
import { ChevronRight, ArrowLeft, BookOpen } from 'lucide-react';
import { chapters, categoryInfo } from '../data/shanhaijing';
import type { Chapter } from '../types';

export default function Chapters() {
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  if (selectedChapter) {
    return <ChapterReader chapter={selectedChapter} onBack={() => setSelectedChapter(null)} />;
  }

  return (
    <div className="paper-bg min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-down">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-ink-800 mb-3">
            篇章目录
          </h1>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
          <p className="text-ink-400 mt-4 font-serif">全书十八篇，按四部分类</p>
        </div>

        {Object.entries(categoryInfo).map(([catKey, catInfo]) => {
          const catChapters = chapters.filter((c) => c.category === catKey);
          if (catChapters.length === 0) return null;

          const colorMap: Record<string, { border: string; text: string; bg: string; hover: string }> = {
            mountain: {
              border: 'border-jade-400/40',
              text: 'text-jade-700',
              bg: 'bg-jade-500/10',
              hover: 'hover:border-jade-500/60 hover:bg-jade-500/15',
            },
            sea: {
              border: 'border-azure-400/40',
              text: 'text-azure-700',
              bg: 'bg-azure-500/10',
              hover: 'hover:border-azure-500/60 hover:bg-azure-500/15',
            },
            wilderness: {
              border: 'border-gold-400/40',
              text: 'text-gold-700',
              bg: 'bg-gold-500/10',
              hover: 'hover:border-gold-500/60 hover:bg-gold-500/15',
            },
            'within-sea': {
              border: 'border-cinnabar-400/40',
              text: 'text-cinnabar-700',
              bg: 'bg-cinnabar-500/10',
              hover: 'hover:border-cinnabar-500/60 hover:bg-cinnabar-500/15',
            },
          };
          const colors = colorMap[catKey];

          return (
            <div key={catKey} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className={`px-4 py-1.5 rounded-lg ${colors.bg} ${colors.border} border`}>
                  <span className={`font-serif text-lg font-bold ${colors.text}`}>
                    {catInfo.label}
                  </span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-paper-400/40 to-transparent" />
                <span className="text-sm text-ink-400 font-serif">
                  {catChapters.length} 篇
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {catChapters.map((chapter, index) => (
                  <button
                    key={chapter.id}
                    onClick={() => setSelectedChapter(chapter)}
                    className={`group text-left p-5 rounded-xl bg-paper-100/70 border ${colors.border} ${colors.hover} backdrop-blur-sm card-hover animate-fade-in-up`}
                    style={{ animationDelay: `${0.05 * index}s` }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-ink-400 font-serif">
                          第{chapter.id}篇
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-ink-400 group-hover:text-ink-600 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className={`font-serif text-xl font-bold ${colors.text} mb-2`}>
                      {chapter.title}
                    </h3>
                    <p className="text-sm text-ink-500 leading-relaxed line-clamp-3 font-serif">
                      {chapter.description}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-ink-400">
                      <span>{chapter.sections.length} 节</span>
                      <span>·</span>
                      <span>
                        {(chapter.sections.flatMap((s) => s.creatures ?? []).length)} 异兽
                      </span>
                      <span>·</span>
                      <span>
                        {(chapter.sections.flatMap((s) => s.mountains ?? []).length)} 山川
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChapterReader({ chapter, onBack }: { chapter: Chapter; onBack: () => void }) {
  return (
    <div className="paper-bg min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-ink-500 hover:text-ink-800 mb-8 transition-colors animate-fade-in"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-serif">返回目录</span>
        </button>

        <div className="text-center mb-12 animate-fade-in-down">
          <div className="text-sm text-ink-400 font-serif mb-2">
            第{chapter.id}篇 · {chapter.categoryLabel}
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-ink-800 mb-4">
            {chapter.title}
          </h1>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
        </div>

        <div className="space-y-8">
          {chapter.sections.map((section, index) => (
            <div
              key={section.id}
              className="p-8 rounded-2xl bg-paper-100/60 border border-paper-300/40 backdrop-blur-sm animate-fade-in-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 flex items-center justify-center bg-cinnabar-500/10 border border-cinnabar-400/30 rounded-lg">
                  <BookOpen className="w-4 h-4 text-cinnabar-600" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-ink-800">
                  {section.title}
                </h2>
              </div>

              <p className="font-serif text-lg text-ink-700 leading-loose tracking-wide">
                {section.content}
              </p>

              {(section.creatures && section.creatures.length > 0) && (
                <div className="mt-6 pt-6 border-t border-paper-300/40">
                  <div className="text-sm text-gold-600 font-serif mb-3">所载异兽</div>
                  <div className="flex flex-wrap gap-2">
                    {section.creatures.map((c) => (
                      <span
                        key={c.id}
                        className="px-3 py-1 text-sm bg-cinnabar-500/10 border border-cinnabar-400/20 rounded-lg text-cinnabar-600 font-serif"
                      >
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(section.mountains && section.mountains.length > 0) && (
                <div className="mt-4 pt-6 border-t border-paper-300/40">
                  <div className="text-sm text-jade-600 font-serif mb-3">所载山川</div>
                  <div className="flex flex-wrap gap-2">
                    {section.mountains.map((m) => (
                      <span
                        key={m.id}
                        className="px-3 py-1 text-sm bg-jade-500/10 border border-jade-400/20 rounded-lg text-jade-600 font-serif"
                      >
                        {m.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
