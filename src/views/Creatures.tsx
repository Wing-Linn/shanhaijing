import { useState, useMemo } from 'react';
import { Search, X, Sparkles, MapPin, Eye, Zap } from 'lucide-react';
import { allCreatures, chapters } from '../data/shanhaijing';
import type { Creature } from '../types';

export default function Creatures() {
  const [search, setSearch] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [selectedCreature, setSelectedCreature] = useState<Creature | null>(null);

  const filtered = useMemo(() => {
    return allCreatures.filter((c) => {
      const matchSearch = !search ||
        c.name.includes(search) ||
        c.description.includes(search) ||
        c.appearance.includes(search);
      const matchChapter = selectedChapter === null || c.chapterId === selectedChapter;
      return matchSearch && matchChapter;
    });
  }, [search, selectedChapter]);

  return (
    <div className="paper-bg min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-down">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-ink-800 mb-3">
            异兽图鉴
          </h1>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
          <p className="text-ink-400 mt-4 font-serif">山海之间，异兽出没，神灵异形</p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索异兽名称或特征..."
              className="w-full pl-12 pr-10 py-3 bg-paper-100/70 border border-paper-300/50 rounded-xl text-ink-700 placeholder-ink-400 focus:outline-none focus:border-cinnabar-400/50 transition-all font-serif"
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
                  ? 'bg-cinnabar-500/15 text-cinnabar-700 border border-cinnabar-400/40'
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
                    ? 'bg-cinnabar-500/15 text-cinnabar-700 border border-cinnabar-400/40'
                    : 'bg-paper-100/60 text-ink-500 border border-paper-300/40 hover:text-ink-700'
                }`}
              >
                {ch.title}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="text-center text-sm text-ink-400 mb-6 font-serif">
          共 {filtered.length} 种异兽
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Sparkles className="w-12 h-12 text-paper-400 mx-auto mb-4" />
            <p className="text-ink-400 font-serif">未找到相关异兽</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((creature, index) => (
              <button
                key={creature.id}
                onClick={() => setSelectedCreature(creature)}
                className="group text-left p-6 rounded-2xl bg-paper-100/70 border border-paper-300/50 backdrop-blur-sm card-hover animate-fade-in-up"
                style={{ animationDelay: `${0.03 * index}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-serif text-2xl font-bold text-cinnabar-600 group-hover:text-cinnabar-500 transition-colors">
                    {creature.name}
                  </h3>
                  <span className="text-xs text-ink-400 font-serif mt-1">
                    {creature.chapterTitle}
                  </span>
                </div>
                <p className="text-sm text-ink-500 leading-relaxed line-clamp-3 font-serif mb-3">
                  {creature.description}
                </p>
                <div className="flex items-center gap-1 text-xs text-gold-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>查看详情</span>
                  <Sparkles className="w-3 h-3" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedCreature && (
        <CreatureDetail
          creature={selectedCreature}
          onClose={() => setSelectedCreature(null)}
        />
      )}
    </div>
  );
}

function CreatureDetail({ creature, onClose }: { creature: Creature; onClose: () => void }) {
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
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-cinnabar-500/10 border border-cinnabar-400/30 rounded-2xl">
            <Sparkles className="w-8 h-8 text-cinnabar-600" />
          </div>
          <h2 className="font-serif text-4xl font-bold text-cinnabar-700 mb-2">
            {creature.name}
          </h2>
          <span className="text-sm text-ink-400 font-serif">
            出自 · {creature.chapterTitle}
          </span>
        </div>

        <div className="space-y-4">
          <DetailRow icon={<Sparkles className="w-4 h-4" />} label="描述" content={creature.description} />
          <DetailRow icon={<Eye className="w-4 h-4" />} label="形貌" content={creature.appearance} />
          <DetailRow icon={<Zap className="w-4 h-4" />} label="能力" content={creature.abilities} />
          <DetailRow icon={<MapPin className="w-4 h-4" />} label="出没" content={creature.location} />
          <DetailRow icon={<Sparkles className="w-4 h-4" />} label="征兆" content={creature.omen} />
        </div>
      </div>
    </div>
  );
}

function DetailRow({ icon, label, content }: { icon: React.ReactNode; label: string; content: string }) {
  return (
    <div className="p-4 rounded-xl bg-paper-100/60 border border-paper-300/40">
      <div className="flex items-center gap-2 mb-2 text-gold-600">
        {icon}
        <span className="text-sm font-serif font-medium">{label}</span>
      </div>
      <p className="text-ink-700 font-serif leading-relaxed">{content}</p>
    </div>
  );
}
