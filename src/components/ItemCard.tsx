import { useState } from 'react';
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Eye,
  Plus,
} from 'lucide-react';
import type { TradeItem } from '@/data/items';
import { ConditionBars, conditionToTier } from '@/components/ConditionBars';

interface ItemCardProps {
  item: TradeItem;
  onOpen: (item: TradeItem) => void;
  highlight?: boolean;
  onAddTrade?: () => void;
}

export function ItemCard({ item, onOpen, highlight, onAddTrade }: ItemCardProps) {
  const [index, setIndex] = useState(0);
  const [fav, setFav] = useState(false);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((i) => (i + 1) % item.images.length);
  };
  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((i) => (i - 1 + item.images.length) % item.images.length);
  };

  return (
    <button
      onClick={() => onOpen(item)}
      className="group text-left flex flex-col bg-surface border border-line rounded-xl overflow-hidden hover:border-ink-400/50 transition-colors focus:outline-none"
    >
      {/* Image with match-rate odds badge */}
      <div className="relative aspect-[4/3] overflow-hidden bg-lineSoft">
        <img
          src={item.images[index]}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
        />

        {/* Match-rate odds pill — Polymarket-style top-left */}
        <span
          className="absolute top-2 left-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900/90 text-emerald-400 border border-slate-700/80 backdrop-blur-sm tnum"
        >
          <span className="text-xs font-semibold leading-none">{item.matchRate}%</span>
          <span className="text-[8px] font-medium uppercase tracking-wide text-emerald-400/75 leading-none">match</span>
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setFav((f) => !f);
          }}
          aria-label="Favorite"
          className="absolute top-2 right-2 w-7 h-7 rounded-md bg-white/85 backdrop-blur flex items-center justify-center hover:bg-white transition-colors border border-line/60"
        >
          <Heart size={13} className={fav ? 'fill-odds-up text-odds-up' : 'text-ink-500'} />
        </button>

        {item.images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md bg-white/85 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-line/60"
            >
              <ChevronLeft size={13} className="text-ink-700" />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md bg-white/85 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-line/60"
            >
              <ChevronRight size={13} className="text-ink-700" />
            </button>
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1">
              {item.images.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full transition-all ${i === index ? 'bg-white w-2.5' : 'bg-white/60 w-1'}`}
                />
              ))}
            </div>
          </>
        )}

      </div>

      {/* Data-dense body */}
      <div className="flex flex-col p-3 gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-[13px] text-ink-900 leading-tight line-clamp-2">{item.title}</h3>
          <span className="text-[12px] font-semibold font-mono text-ink-900 flex-shrink-0 tnum bg-lineSoft px-1.5 py-0.5 rounded">
            {item.estimatedValue}
          </span>
        </div>

        {/* Location row — thin, monospace-ish */}
        <p className="text-[11px] text-ink-500 flex items-center gap-1 truncate tnum">
          <MapPin size={10} className="flex-shrink-0 text-ink-400" />
          {item.distanceKm} km
          <span className="text-ink-400">·</span>
          <span className="truncate font-medium text-ink-700">{item.suburb}</span>
        </p>

        {/* Condition bars */}
        <div className="flex items-center gap-2">
          <ConditionBars tier={conditionToTier(item.condition, item.conditionScore)} size="sm" />
          <span className="text-[10px] font-medium text-ink-500">{item.condition}</span>
        </div>

        {/* Action pill */}
        {item.freeTrade ? (
          <div
            onClick={(e) => {
              e.stopPropagation();
              onAddTrade?.();
            }}
            className="flex items-center justify-center gap-1 mt-0.5 px-2.5 py-1.5 rounded-lg border border-ink-400/30 bg-lineSoft/60 text-ink-700 group-hover:bg-ink-900 group-hover:text-white group-hover:border-ink-900 transition-colors cursor-pointer"
          >
            <Plus size={12} className="flex-shrink-0" />
            <span className="text-[11px] font-semibold tracking-wide">Add your trade</span>
          </div>
        ) : (
          <div className="mt-0.5 px-2.5 py-1.5 rounded-lg border border-line bg-lineSoft/40">
            <span className="block text-[8px] font-semibold uppercase tracking-wider text-ink-400 leading-none mb-0.5">
              Looking for
            </span>
            <span className="block text-[11px] font-medium text-ink-700 leading-tight line-clamp-1">{item.lookingFor}</span>
          </div>
        )}

        {/* Stat row */}
        <div className="flex items-center gap-2 pt-1.5 border-t border-lineSoft text-[10px] font-medium text-ink-500 tnum">
          <span className="flex items-center gap-0.5">
            <Eye size={10} className="text-ink-400" />
            {item.views >= 1000 ? `${(item.views / 1000).toFixed(1)}k` : item.views}
          </span>
          <span className="text-line">|</span>
          <span>{item.totalTrades} trades</span>
          <span className="ml-auto flex items-center gap-1.5">
            <span className="relative flex-shrink-0">
              <span className="w-6 h-6 rounded-full bg-gradient-to-br from-ink-300 to-ink-500 flex items-center justify-center text-[9px] font-bold text-white">
                {item.owner.charAt(0)}
              </span>
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-surface" />
            </span>
            <span className="text-ink-400 truncate">{item.owner}</span>
          </span>
        </div>
      </div>
    </button>
  );
}
