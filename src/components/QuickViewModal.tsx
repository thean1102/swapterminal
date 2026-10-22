import { useEffect, useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Shield,
  Check,
  Eye,
  Repeat2,
  TrendingUp,
  Handshake,
  Info,
  Sparkles,
  Zap,
  Star,
  ShieldCheck,
  BadgeCheck,
  ArrowRight,
} from 'lucide-react';
import type { TradeItem } from '@/data/items';
import { ConditionBars, conditionToTier } from '@/components/ConditionBars';

interface QuickViewModalProps {
  item: TradeItem | null;
  onClose: () => void;
  onShowProfile: (owner: string, suburb: string) => void;
}

export function QuickViewModal({ item, onClose, onShowProfile }: QuickViewModalProps) {
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    setIndex(0);
    setToast(false);
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [item, onClose]);

  if (!item) return null;

  const next = () => setIndex((i) => (i + 1) % item.images.length);
  const prev = () => setIndex((i) => (i - 1 + item.images.length) % item.images.length);

  const propose = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-ink-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      <div
        className="relative bg-surface w-full h-full sm:max-w-4xl sm:max-h-[90vh] sm:rounded-xl overflow-hidden border border-line flex flex-col sm:flex-row animate-[scaleIn_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-md bg-surface/90 backdrop-blur flex items-center justify-center hover:bg-lineSoft transition-colors border border-line"
        >
          <X size={16} className="text-ink-700" />
        </button>

        {/* Gallery */}
        <div className="relative sm:w-1/2 bg-ink-900 flex-shrink-0 h-[38%] sm:h-auto">
          <img
            src={item.images[index]}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          {item.images.length > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md bg-surface/90 flex items-center justify-center hover:bg-surface transition-colors border border-line"
              >
                <ChevronLeft size={16} className="text-ink-700" />
              </button>
              <button
                onClick={next}
                aria-label="Next"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md bg-surface/90 flex items-center justify-center hover:bg-surface transition-colors border border-line"
              >
                <ChevronRight size={16} className="text-ink-700" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {item.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Image ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? 'bg-white w-4' : 'bg-white/60 w-1.5'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Details */}
        <div className="sm:w-1/2 flex flex-col overflow-y-auto p-5 sm:p-7 gap-4 bg-surface">
          {/* Header row */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <span className="px-2 py-0.5 rounded-md bg-lineSoft border border-line text-[11px] font-semibold text-ink-700 tnum">
                {item.estimatedValue}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-medium text-ink-500">
                <Shield size={12} className="text-odds-up" /> Verified owner
              </span>
            </div>
            <h2 className="text-xl font-bold text-ink-900 leading-tight">{item.title}</h2>
            <div className="flex items-center gap-2 text-[12px] text-ink-500 tnum">
              <span className="font-semibold text-ink-700">{item.owner}</span>
              <span className="text-line">|</span>
              <span className="flex items-center gap-1">
                <MapPin size={11} className="text-ink-400" /> {item.location}
              </span>
            </div>
          </div>

          {/* Match-rate odds strip — Polymarket style */}
          <div className="grid grid-cols-3 gap-px bg-line rounded-lg overflow-hidden border border-line">
            <div className="flex flex-col items-center gap-0.5 py-2.5 bg-surface">
              <TrendingUp size={14} className="text-odds-up" />
              <span className="text-base font-bold text-ink-900 leading-none tnum">{item.matchRate}%</span>
              <span className="text-[9px] uppercase tracking-wide text-ink-400">Match</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 py-2.5 bg-surface">
              <Handshake size={14} className="text-ink-500" />
              <span className="text-base font-bold text-ink-900 leading-none tnum">{item.totalTrades}</span>
              <span className="text-[9px] uppercase tracking-wide text-ink-400">Trades</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 py-2.5 bg-surface">
              <Eye size={14} className="text-ink-500" />
              <span className="text-base font-bold text-ink-900 leading-none tnum">
                {item.views >= 1000 ? `${(item.views / 1000).toFixed(1)}k` : item.views}
              </span>
              <span className="text-[9px] uppercase tracking-wide text-ink-400">Views</span>
            </div>
          </div>

          {/* Condition + distance */}
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-lineSoft/60 border border-line">
            <div className="flex-1">
              <p className="text-[9px] uppercase tracking-wide text-ink-400">Condition</p>
              <div className="flex items-center gap-2 mt-0.5">
                <ConditionBars tier={conditionToTier(item.condition, item.conditionScore)} size="sm" />
                <span className="text-[13px] font-semibold text-ink-900 tnum">{item.condition}</span>
              </div>
            </div>
            <div className="w-px h-8 bg-line" />
            <div className="flex-1">
              <p className="text-[9px] uppercase tracking-wide text-ink-400">Distance</p>
              <p className="text-[13px] font-semibold text-ink-900 tnum">{item.distanceKm} km away</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-ink-400 mb-1.5">
              About this item
            </h3>
            <p className="text-[13px] text-ink-700 leading-relaxed">{item.description}</p>
          </div>

          {/* Looking-for / Free-trade block — flat institutional */}
          {item.freeTrade ? (
            <div className="p-3.5 rounded-lg border border-line bg-lineSoft/60">
              <div className="flex items-center gap-1.5 mb-1">
                <Info size={13} className="text-ink-500" />
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-ink-500">Open to any trade</h3>
              </div>
              <p className="text-[13px] text-ink-700 leading-relaxed">
                {item.owner} did not specify what they want. Offer anything you have — they will review and decide.
              </p>
            </div>
          ) : (
            <div className="p-3.5 rounded-lg border border-line bg-lineSoft/60">
              <div className="flex items-center gap-1.5 mb-1">
                <Repeat2 size={13} className="text-ink-500" />
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-ink-500">Looking to trade for</h3>
              </div>
              <p className="text-[13px] font-semibold text-ink-900 leading-relaxed">{item.lookingFor}</p>
            </div>
          )}

          {/* Pro-Trader Snippet */}
          <div
            className="bg-slate-800/40 border border-slate-700/60 p-3 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => onShowProfile(item.owner, item.suburb)}
                className="relative flex-shrink-0 group"
                aria-label={`View ${item.owner}'s profile`}
              >
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center text-[12px] font-bold text-white border border-slate-600 group-hover:border-slate-400 transition-colors">
                  {item.owner.charAt(0)}
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-800" />
              </button>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onShowProfile(item.owner, item.suburb)}
                    className="text-[13px] font-bold text-slate-200 hover:text-white transition-colors"
                  >
                    {item.owner}
                  </button>
                  <BadgeCheck size={12} className="text-emerald-400 flex-shrink-0" />
                  <span className="text-[9px] font-medium text-emerald-400/80">Verified Trader</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                  <MapPin size={9} className="text-slate-600" /> {item.location}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-900/60 border border-slate-700/50 text-[10px] font-medium text-amber-400">
                <Zap size={9} className="fill-amber-400" /> 98% Resp. Rate (~12m)
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-900/60 border border-slate-700/50 text-[10px] font-medium text-sky-400">
                <Star size={9} className="fill-sky-400" /> 4.9 Rating (7 Swaps)
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-900/60 border border-slate-700/50 text-[10px] font-medium text-emerald-400">
                <ShieldCheck size={9} /> ID Verified
              </span>
            </div>
            <button
              onClick={() => onShowProfile(item.owner, item.suburb)}
              className="group inline-flex items-center gap-1 mt-2.5 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              View Full Profile & Analytics
              <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* CTA */}
          <div className="mt-auto pt-2">
            <button
              onClick={propose}
              className="w-full py-3 rounded-lg bg-ink-900 hover:bg-ink-700 active:scale-[0.99] transition-all text-white font-semibold text-[13px] flex items-center justify-center gap-2"
            >
              <Sparkles size={16} /> Propose a Trade
            </button>
            <p className="text-center text-[10px] text-ink-400 mt-1.5">
              No login required for this demo
            </p>
          </div>
        </div>

        {toast && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-lg bg-ink-900 text-white text-[13px] font-medium flex items-center gap-2 animate-[scaleIn_0.2s_ease-out] border border-ink-700">
            <Check size={15} className="text-odds-up" />
            Trade proposal sent to {item.owner}!
          </div>
        )}
      </div>
    </div>
  );
}
