import { useState, useRef, useEffect } from 'react';
import { Search, ArrowUpDown, TrendingUp, Flame, X } from 'lucide-react';
import { items } from '@/data/items';

interface TrendingTerm {
  label: string;
  category: string;
  searches: number;
  trend: number;
}

const trendingTerms: TrendingTerm[] = [
  { label: 'PS5 Slim', category: 'Electronics', searches: 3420, trend: 28 },
  { label: 'ASUS ROG Gaming Laptop', category: 'Electronics', searches: 2890, trend: 15 },
  { label: 'Nike Air Jordan 1', category: 'Apparel', searches: 2150, trend: 22 },
  { label: 'Canon EOS R6', category: 'Electronics', searches: 1870, trend: 8 },
  { label: 'Mechanical Keyboard', category: 'Electronics', searches: 1640, trend: 34 },
  { label: 'Seiko Skeleton Watch', category: 'Watches', searches: 1310, trend: 12 },
  { label: 'Electric Scooter', category: 'Electronics', searches: 1180, trend: 19 },
  { label: 'Vinyl Collection', category: 'Home', searches: 940, trend: 6 },
];

function TrendArrow({ trend }: { trend: number }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-[10px] font-mono font-semibold tnum ${trend >= 15 ? 'text-emerald-500' : 'text-ink-400'}`}>
      <TrendingUp size={10} className={trend >= 15 ? 'text-emerald-500' : 'text-ink-400'} />
      +{trend}%
    </span>
  );
}

function MiniSparkline({ trend }: { trend: number }) {
  const W = 40;
  const H = 18;
  const steepness = trend / 40;
  const pts = [0, 1, 2, 3, 4].map((i) => ({
    x: (i / 4) * W,
    y: H - (i / 4) * H * (0.35 + steepness * 0.6) - 2,
  }));
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const color = trend >= 15 ? '#2E9C6A' : '#8A98A8';
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      <path d={path} fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="1.5" fill={color} />
    </svg>
  );
}

interface SearchBarProps {
  query: string;
  onQueryChange: (v: string) => void;
}

function SearchBar({ query, onQueryChange }: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const showDropdown = focused && !query.trim();

  const suggestions = query.trim()
    ? items
        .filter((it) => {
          const q = query.toLowerCase();
          return (
            it.title.toLowerCase().includes(q) ||
            it.suburb.toLowerCase().includes(q) ||
            it.owner.toLowerCase().includes(q) ||
            it.category.toLowerCase().includes(q)
          );
        })
        .slice(0, 6)
    : [];

  const showSuggestions = focused && !!query.trim() && suggestions.length > 0;

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="flex items-center w-full bg-surface rounded-lg border border-line transition-colors focus-within:border-ink-400/60 pl-3 pr-1.5 py-1.5">
        <Search size={15} className="text-ink-400 flex-shrink-0" />
        <input
          value={query}
          placeholder="Search items, suburbs, or traders..."
          onChange={(e) => onQueryChange(e.target.value)}
          onFocus={() => setFocused(true)}
          className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-400 outline-none px-2.5"
        />
        {query && (
          <button
            onClick={() => onQueryChange('')}
            aria-label="Clear search"
            className="flex-shrink-0 w-6 h-6 rounded flex items-center justify-center text-ink-400 hover:text-ink-700 hover:bg-lineSoft transition-colors"
          >
            <X size={13} />
          </button>
        )}
        <button
          onClick={() => setFocused(false)}
          aria-label="Search"
          className="flex-shrink-0 w-7 h-7 rounded-md bg-ink-900 hover:bg-ink-700 transition-colors flex items-center justify-center text-white"
        >
          <Search size={13} />
        </button>
      </div>

      {/* Trending dropdown — shown on focus with empty query */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1.5 rounded-lg border border-line bg-surface shadow-lg shadow-ink-900/8 overflow-hidden z-50 animate-[fadeIn_0.15s_ease-out]">
          <div className="flex items-center justify-between px-3 py-2 border-b border-lineSoft bg-lineSoft/40">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-ink-500">
              <Flame size={12} className="text-odds-up" />
              Trending Searches
            </span>
            <span className="text-[9px] font-medium text-ink-400">Live · Updated 2m ago</span>
          </div>
          <div className="py-1 max-h-[340px] overflow-y-auto">
            {trendingTerms.map((term, i) => (
              <button
                key={term.label}
                onClick={() => {
                  onQueryChange(term.label);
                  setFocused(false);
                }}
                className="group w-full flex items-center gap-2.5 px-3 py-2 hover:bg-lineSoft/60 transition-colors text-left"
              >
                <span className="w-5 text-center text-[10px] font-mono font-bold text-ink-400 tnum flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold text-ink-900 truncate group-hover:text-ink-700 transition-colors">
                    {term.label}
                  </p>
                  <p className="text-[10px] text-ink-400 mt-0.5">{term.category} · {term.searches.toLocaleString()} searches</p>
                </div>
                <span className="w-10 h-4.5 flex-shrink-0">
                  <MiniSparkline trend={term.trend} />
                </span>
                <TrendArrow trend={term.trend} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search suggestions — shown when typing */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1.5 rounded-lg border border-line bg-surface shadow-lg shadow-ink-900/8 overflow-hidden z-50 animate-[fadeIn_0.15s_ease-out]">
          <div className="px-3 py-1.5 border-b border-lineSoft bg-lineSoft/40">
            <span className="text-[9px] font-bold uppercase tracking-wider text-ink-400">
              {suggestions.length} result{suggestions.length > 1 ? 's' : ''}
            </span>
          </div>
          <div className="py-1">
            {suggestions.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onQueryChange(item.title);
                  setFocused(false);
                }}
                className="group w-full flex items-center gap-2.5 px-3 py-2 hover:bg-lineSoft/60 transition-colors text-left"
              >
                <span className="w-7 h-7 rounded-md overflow-hidden bg-lineSoft flex-shrink-0">
                  <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold text-ink-900 truncate">{item.title}</p>
                  <p className="text-[10px] text-ink-400 mt-0.5">
                    {item.suburb} · {item.estimatedValue} · {item.owner}
                  </p>
                </div>
                <span className="text-[10px] font-mono font-semibold text-emerald-600 tnum flex-shrink-0">
                  {item.matchRate}%
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface HeaderProps {
  query: string;
  onQueryChange: (v: string) => void;
}

export function Header({ query, onQueryChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-surface/95 backdrop-blur border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-6 h-14">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 rounded-md bg-ink-900 flex items-center justify-center text-white">
              <ArrowUpDown size={15} />
            </div>
            <span className="font-bold text-base tracking-tight text-ink-900 hidden sm:block">Swap</span>
            <span className="hidden md:inline text-[10px] font-semibold uppercase tracking-wider text-ink-400 border border-line rounded px-1.5 py-0.5 ml-1">
              Terminal
            </span>
          </div>

          <div className="flex-1 max-w-xl mx-auto">
            <SearchBar query={query} onQueryChange={onQueryChange} />
          </div>

          <nav className="hidden lg:flex items-center gap-5 text-[13px] font-medium text-ink-500 flex-shrink-0">
            <a href="#" className="hover:text-ink-900 transition-colors">Browse</a>
            <a href="#" className="hover:text-ink-900 transition-colors">How it works</a>
            <a href="#" className="hover:text-ink-900 transition-colors">Safety</a>
          </nav>

          <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-line hover:border-ink-400/50 text-[13px] font-medium text-ink-700 transition-colors flex-shrink-0">
            Sign in
          </button>
        </div>
      </div>
    </header>
  );
}
