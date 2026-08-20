import { useState, useMemo } from 'react';
import { Search, X, Mountain, MapPin, Gem } from 'lucide-react';
import { allMountains, chapters } from '../data/shanhaijing';
import type { Mountain as MountainType } from '../types';

export default function Mountains() {
  const [search, setSearch] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [selectedMountain, setSelectedMountain] = useState<MountainType | null>(null);

  const filtered = useMemo(() => {
    return allMountains.filter((m) => {
      const matchSearch = !search ||
        m.name.includes(search) ||
        m.description.includes(search) ||
        m.resources.some((r) => r.includes(search));
      const matchChapter = selectedChapter === null || m.chapterId === selectedChapter;
      return matchSearch && matchChapter;
    });
  }, [search, selectedChapter]);

  return (
    <div className="paper-bg min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-down">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-ink-800 mb-3">
            山川志
          </h1>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
          <p className="text-ink-400 mt-4 font-serif">天下山川，物产丰饶，神灵居焉</p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索山名或物产..."
              className="w-full pl-12 pr-10 py-3 bg-paper-100/70 border border-paper-300/50 rounded-xl text-ink-700 placeholder-ink-400 focus:outline-none focus:border-jade-400/50 transition-all font-serif"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedChapter(null)}
              className={`px-4 py-1.5 text-sm rounded-lg font-serif transition-all ${
                selectedChapter === null
                  ? 'bg-jade-500/15 text-jade-700 border border-jade-400/40'
                  : 'bg-paper-100/60 text-ink-500 border border-paper-300/40 hover:text-ink-700'
              }`}
            >
              全部
            </button>
            {chapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setSelectedChapter(ch.id)}
                className={`px-4 py-1.5 text-sm rounded-lg font-serif transition-all ${
                  selectedChapter === ch.id
                    ? 'bg-jade-500/15 text-jade-700 border border-jade-400/40'
                    : 'bg-paper-100/60 text-ink-500 border border-paper-300/40 hover:text-ink-700'
                }`}
              >
                {ch.title}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center text-sm text-ink-400 mb-6 font-serif">
          共 {filtered.length} 座山川
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Mountain className="w-12 h-12 text-paper-400 mx-auto mb-4" />
            <p className="text-ink-400 font-serif">未找到相关山川</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((mountain, index) => (
              <button
                key={mountain.id}
                onClick={() => setSelectedMountain(mountain)}
                className="group text-left p-6 rounded-2xl bg-paper-100/70 border border-paper-300/50 backdrop-blur-sm card-hover animate-fade-in-up"
                style={{ animationDelay: `${0.03 * index}s` }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-jade-500/10 border border-jade-400/20 rounded-lg group-hover:scale-110 transition-transform">
                    <Mountain className="w-5 h-5 text-jade-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-bold text-jade-700 group-hover:text-jade-600 transition-colors">
                      {mountain.name}
                    </h3>
                    <span className="text-xs text-ink-400 font-serif">
                      {mountain.chapterTitle}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-ink-500 leading-relaxed line-clamp-2 font-serif mb-3">
                  {mountain.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {mountain.resources.slice(0, 4).map((r, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-xs bg-gold-500/10 border border-gold-400/20 rounded text-gold-700 font-serif"
                    >
                      {r}
                    </span>
                  ))}
                  {mountain.resources.length > 4 && (
                    <span className="px-2 py-0.5 text-xs text-ink-400 font-serif">
                      +{mountain.resources.length - 4}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedMountain && (
        <MountainDetail mountain={selectedMountain} onClose={() => setSelectedMountain(null)} />
      )}
    </div>
  );
}

function MountainDetail({ mountain, onClose }: { mountain: MountainType; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/40 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full p-8 rounded-2xl bg-paper-50 border border-paper-300/60 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ink-400 hover:text-ink-700 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-jade-500/10 border border-jade-400/30 rounded-2xl">
            <Mountain className="w-8 h-8 text-jade-600" />
          </div>
          <h2 className="font-serif text-4xl font-bold text-jade-700 mb-2">
            {mountain.name}
          </h2>
          <span className="text-sm text-ink-400 font-serif">
            出自 · {mountain.chapterTitle}
          </span>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-paper-100/60 border border-paper-300/40">
            <div className="flex items-center gap-2 mb-2 text-jade-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-serif font-medium">山川描述</span>
            </div>
            <p className="text-ink-700 font-serif leading-relaxed">{mountain.description}</p>
          </div>

          <div className="p-4 rounded-xl bg-paper-100/60 border border-paper-300/40">
            <div className="flex items-center gap-2 mb-3 text-gold-600">
              <Gem className="w-4 h-4" />
              <span className="text-sm font-serif font-medium">所产之物</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {mountain.resources.map((r, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-sm bg-gold-500/10 border border-gold-400/20 rounded-lg text-gold-700 font-serif"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
