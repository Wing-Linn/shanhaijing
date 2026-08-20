import { BookOpen, Sparkles, Mountain, ChevronRight } from 'lucide-react';
import type { ViewType } from '../types';
import { chapters, allCreatures, allMountains, categoryInfo } from '../data/shanhaijing';

interface HomeProps {
  onNavigate: (view: ViewType) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const stats = [
    { label: '篇章', value: chapters.length, icon: BookOpen },
    { label: '异兽', value: allCreatures.length, icon: Sparkles },
    { label: '山川', value: allMountains.length, icon: Mountain },
  ];

  const categories = Object.entries(categoryInfo);

  return (
    <div className="paper-bg min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cinnabar-400/8 rounded-full blur-3xl animate-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-jade-400/8 rounded-full blur-3xl animate-glow" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-300/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Seal stamp decoration */}
          <div className="flex justify-center mb-8 animate-fade-in-down">
            <div className="w-20 h-20 seal-stamp text-3xl rounded-xl shadow-lg">
              經
            </div>
          </div>

          {/* Main title */}
          <h1 className="font-serif text-7xl sm:text-8xl md:text-9xl font-black text-ink-800 mb-4 tracking-widest animate-fade-in-up text-shadow-sm">
            山<span className="text-cinnabar-500">海</span>經
          </h1>

          <p className="font-serif text-lg sm:text-xl text-ink-500 mb-2 tracking-wider animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            上古奇书 · 地理志异 · 神话渊薮
          </p>
          <p className="text-sm text-ink-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            《山海经》是中国上古地理志怪奇书，全书十八篇，记载山川道里、神灵异兽、方国部族、奇花异草，
            汇聚远古神话传说，是中华文明最古老的想象之书。
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => onNavigate('chapters')}
              className="group flex items-center gap-2 px-8 py-3 bg-cinnabar-600 hover:bg-cinnabar-500 text-paper-50 font-serif text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-cinnabar-400/30 hover:scale-105"
            >
              <BookOpen className="w-5 h-5" />
              开始阅读
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('creatures')}
              className="group flex items-center gap-2 px-8 py-3 bg-paper-200/70 hover:bg-paper-300/70 text-ink-700 font-serif text-lg rounded-lg border border-paper-400/50 transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="w-5 h-5 text-gold-600" />
              探索异兽
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 sm:gap-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Icon className="w-5 h-5 text-ink-400" />
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-gold-700">
                    {stat.value}
                  </div>
                  <div className="text-sm text-ink-400 font-serif tracking-wider">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-800 mb-3">
              四部经书
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
            <p className="text-ink-400 mt-4 font-serif">全书十八篇，分为四部</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(([key, info], index) => {
              const count = chapters.filter((c) => c.category === key).length;
              const colorMap: Record<string, string> = {
                mountain: 'from-jade-100/60 to-jade-200/30 border-jade-400/40 hover:border-jade-500/60',
                sea: 'from-azure-100/60 to-azure-200/30 border-azure-400/40 hover:border-azure-500/60',
                wilderness: 'from-gold-100/60 to-gold-200/30 border-gold-400/40 hover:border-gold-500/60',
                'within-sea': 'from-cinnabar-100/60 to-cinnabar-200/30 border-cinnabar-400/40 hover:border-cinnabar-500/60',
              };
              const textColorMap: Record<string, string> = {
                mountain: 'text-jade-700',
                sea: 'text-azure-700',
                wilderness: 'text-gold-700',
                'within-sea': 'text-cinnabar-700',
              };
              return (
                <button
                  key={key}
                  onClick={() => onNavigate('chapters')}
                  className={`text-left p-6 rounded-2xl bg-gradient-to-br ${colorMap[key]} border backdrop-blur-sm card-hover animate-fade-in-up`}
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className={`font-serif text-2xl font-bold ${textColorMap[key]} mb-2`}>
                    {info.label}
                  </div>
                  <div className="text-xs text-ink-400 mb-3">
                    共 {count} 篇
                  </div>
                  <p className="text-sm text-ink-600 leading-relaxed font-serif">
                    {info.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Creatures */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-800 mb-3">
              奇兽异灵
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
            <p className="text-ink-400 mt-4 font-serif">山海之间，异兽出没</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCreatures.slice(0, 6).map((creature, index) => (
              <button
                key={creature.id}
                onClick={() => onNavigate('creatures')}
                className="group text-left p-6 rounded-2xl bg-paper-100/70 border border-paper-300/50 backdrop-blur-sm card-hover animate-fade-in-up"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-serif text-2xl font-bold text-cinnabar-600 group-hover:text-cinnabar-500 transition-colors">
                    {creature.name}
                  </h3>
                  <span className="text-xs text-ink-400 font-serif mt-1">
                    {creature.chapterTitle}
                  </span>
                </div>
                <p className="text-sm text-ink-500 leading-relaxed line-clamp-3 font-serif">
                  {creature.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs text-gold-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>查看详情</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="px-4 pb-32">
        <div className="max-w-3xl mx-auto text-center ornate-border py-12">
          <p className="font-serif text-xl sm:text-2xl text-ink-600 leading-loose italic">
            "地之所载，六合之间，四海之内，
            <br />
            照之以日月，经之以星辰，
            <br />
            纪之以四时，要之以太岁。"
          </p>
          <p className="mt-6 text-sm text-ink-400 font-serif tracking-wider">
            — 山海经 · 海外南经
          </p>
        </div>
      </section>
    </div>
  );
}
