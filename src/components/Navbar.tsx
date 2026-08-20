import { BookOpen, Mountain, Sparkles, Search, Home, X } from 'lucide-react';
import type { ViewType } from '../types';

interface NavbarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const navItems: { id: ViewType; label: string; icon: typeof Home }[] = [
  { id: 'home', label: '首页', icon: Home },
  { id: 'chapters', label: '篇章', icon: BookOpen },
  { id: 'creatures', label: '异兽', icon: Sparkles },
  { id: 'mountains', label: '山川', icon: Mountain },
];

export default function Navbar({ currentView, onNavigate, searchQuery, onSearchChange }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-paper-100/85 backdrop-blur-md border-b border-paper-300/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 seal-stamp text-lg rounded-lg group-hover:scale-110 transition-transform">
              山
            </div>
            <div className="hidden sm:block">
              <span className="font-serif text-xl font-bold text-ink-800 tracking-wider">
                山海经
              </span>
              <span className="ml-2 text-xs text-ink-400 font-serif">
                Classic of Mountains and Seas
              </span>
            </div>
          </button>

          <div className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-cinnabar-500/10 text-cinnabar-700 border border-cinnabar-400/30'
                      : 'text-ink-500 hover:text-ink-800 hover:bg-paper-200/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline font-serif">{item.label}</span>
                </button>
              );
            })}

            <div className="relative ml-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (e.target.value && currentView !== 'search') {
                    onNavigate('search');
                  }
                }}
                placeholder="搜索..."
                className="w-32 sm:w-48 pl-9 pr-8 py-2 text-sm bg-paper-200/50 border border-paper-300/50 rounded-lg text-ink-700 placeholder-ink-400 focus:outline-none focus:border-cinnabar-400/50 focus:w-40 sm:focus:w-56 transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    onSearchChange('');
                    onNavigate('home');
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
