import { useMemo } from 'react';
import { Search, X, BookOpen, Sparkles, Mountain } from 'lucide-react';
import { chapters, allCreatures, allMountains } from '../data/shanhaijing';
import type { ViewType } from '../types';

interface SearchViewProps {
  query: string;
  onQueryChange: (q: string) => void;
  onNavigate: (view: ViewType) => void;
}

export default function SearchView({ query, onQueryChange, onNavigate }: SearchViewProps) {
  const results = useMemo(() => {
    if (!query.trim()) return { chapters: [], creatures: [], mountains: [] };

    return {
      chapters: chapters.filter(
        (c) =>
          c.title.includes(query) ||
          c.description.includes(query) ||
          c.sections.some((s) => s.content.includes(query) || s.title.includes(query))
      ),
      creatures: allCreatures.filter(
        (c) =>
          c.name.includes(query) ||
          c.description.includes(query) ||
          c.appearance.includes(query) ||
          c.abilities.includes(query) ||
          c.location.includes(query) ||
          c.omen.includes(query)
      ),
      mountains: allMountains.filter(
        (m) =>
          m.name.includes(query) ||
          m.description.includes(query) ||
          m.resources.some((r) => r.includes(query))
      ),
    };
  }, [query]);

  const total = results.chapters.length + results.creatures.length + results.mountains.length;

  return (
    <div className="paper-bg min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in-down">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink-800 mb-3">
            搜索结果
          </h1>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
        </div>

        {/* Search bar */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="搜索篇章、异兽、山川..."
            autoFocus
            className="w-full pl-12 pr-10 py-3 bg-paper-100/70 border border-paper-300/50 rounded-xl text-ink-700 placeholder-ink-400 focus:outline-none focus:border-cinnabar-400/50 transition-all font-serif text-lg"
          />
          {query && (
            <button
              onClick={() => onQueryChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {query.trim() === '' ? (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-paper-400 mx-auto mb-4" />
            <p className="text-ink-400 font-serif">输入关键词以搜索山海经内容</p>
          </div>
        ) : total === 0 ? (
          <div className="text-center py-20">
            <X className="w-12 h-12 text-paper-400 mx-auto mb-4" />
            <p className="text-ink-400 font-serif">
              未找到与「{query}」相关的内容
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center text-sm text-ink-400 font-serif">
              共找到 {total} 条结果
            </div>

            {/* Chapters */}
            {results.chapters.length > 0 && (
              <ResultSection
                title="篇章"
                icon={<BookOpen className="w-5 h-5" />}
                count={results.chapters.length}
                onNavigate={() => onNavigate('chapters')}
              >
                {results.chapters.map((ch) => (
                  <div
                    key={ch.id}
                    className="p-4 rounded-xl bg-paper-100/70 border border-paper-300/40 card-hover"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-serif text-lg font-bold text-ink-800">
                        {ch.title}
                      </span>
                      <span className="text-xs text-ink-400">第{ch.id}篇 · {ch.categoryLabel}</span>
                    </div>
                    <p className="text-sm text-ink-500 leading-relaxed font-serif line-clamp-2">
                      {ch.description}
                    </p>
                  </div>
                ))}
              </ResultSection>
            )}

            {/* Creatures */}
            {results.creatures.length > 0 && (
              <ResultSection
                title="异兽"
                icon={<Sparkles className="w-5 h-5" />}
                count={results.creatures.length}
                onNavigate={() => onNavigate('creatures')}
              >
                {results.creatures.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 rounded-xl bg-paper-100/70 border border-paper-300/40 card-hover"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-serif text-lg font-bold text-cinnabar-600">
                        {c.name}
                      </span>
                      <span className="text-xs text-ink-400">{c.chapterTitle}</span>
                    </div>
                    <p className="text-sm text-ink-500 leading-relaxed font-serif line-clamp-2">
                      {c.description}
                    </p>
                  </div>
                ))}
              </ResultSection>
            )}

            {/* Mountains */}
            {results.mountains.length > 0 && (
              <ResultSection
                title="山川"
                icon={<Mountain className="w-5 h-5" />}
                count={results.mountains.length}
                onNavigate={() => onNavigate('mountains')}
              >
                {results.mountains.map((m) => (
                  <div
                    key={m.id}
                    className="p-4 rounded-xl bg-paper-100/70 border border-paper-300/40 card-hover"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-serif text-lg font-bold text-jade-700">
                        {m.name}
                      </span>
                      <span className="text-xs text-ink-400">{m.chapterTitle}</span>
                    </div>
                    <p className="text-sm text-ink-500 leading-relaxed font-serif line-clamp-2">
                      {m.description}
                    </p>
                  </div>
                ))}
              </ResultSection>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ResultSection({
  title,
  icon,
  count,
  onNavigate,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  count: number;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2 text-gold-600">
          {icon}
          <span className="font-serif text-lg font-bold">{title}</span>
        </div>
        <span className="text-sm text-ink-400">{count} 条</span>
        <div className="flex-1 h-px bg-gradient-to-r from-paper-400/40 to-transparent" />
        <button
          onClick={onNavigate}
          className="text-sm text-ink-400 hover:text-ink-700 transition-colors font-serif"
        >
          查看全部 →
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>
    </div>
  );
}
