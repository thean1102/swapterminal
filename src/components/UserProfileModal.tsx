import { useEffect, useState } from 'react';
import {
  X,
  MapPin,
  BadgeCheck,
  Zap,
  Star,
  ShieldCheck,
  Package,
  ArrowLeftRight,
  MessageSquare,
} from 'lucide-react';
import type { TraderProfile } from '@/data/traderProfiles';
import { ConditionBars } from '@/components/ConditionBars';

interface UserProfileModalProps {
  profile: TraderProfile | null;
  onClose: () => void;
}

type TabId = 'listings' | 'history' | 'reviews';

function LineChart({ data }: { data: { month: string; swaps: number }[] }) {
  const W = 480;
  const H = 160;
  const pad = { top: 20, right: 16, bottom: 28, left: 30 };
  const cw = W - pad.left - pad.right;
  const ch = H - pad.top - pad.bottom;
  const max = Math.max(...data.map((d) => d.swaps), 1);
  const pts = data.map((d, i) => ({
    x: pad.left + (i / (data.length - 1)) * cw,
    y: pad.top + ch - (d.swaps / max) * ch,
  }));
  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${pts[pts.length - 1].x} ${pad.top + ch} L ${pts[0].x} ${pad.top + ch} Z`;
  const gid = 'lineGrad';

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2E9C6A" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#2E9C6A" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <line
          key={t}
          x1={pad.left}
          y1={pad.top + ch * t}
          x2={pad.left + cw}
          y2={pad.top + ch * t}
          stroke="#1E293B"
          strokeWidth="1"
        />
      ))}
      <path d={areaPath} fill={`url(#${gid})`} />
      <path d={linePath} fill="none" stroke="#2E9C6A" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="#0F172A" stroke="#2E9C6A" strokeWidth="1.5" />
      ))}
      {data.map((d, i) => (
        <text
          key={i}
          x={pad.left + (i / (data.length - 1)) * cw}
          y={H - 8}
          textAnchor="middle"
          className="fill-slate-500"
          style={{ fontSize: '9px', fontWeight: 500 }}
        >
          {d.month}
        </text>
      ))}
    </svg>
  );
}

function DonutChart({ data }: { data: { label: string; percentage: number; color: string }[] }) {
  const R = 52;
  const C = 2 * Math.PI * R;
  let offset = 0;

  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 140 140" className="w-[130px] h-[130px] flex-shrink-0">
        {data.map((d, i) => {
          const len = (d.percentage / 100) * C;
          const el = (
            <circle
              key={i}
              cx="70"
              cy="70"
              r={R}
              fill="none"
              stroke={d.color}
              strokeWidth="14"
              strokeDasharray={`${len} ${C - len}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 70 70)"
            />
          );
          offset += len;
          return el;
        })}
        <text x="70" y="66" textAnchor="middle" className="fill-white" style={{ fontSize: '18px', fontWeight: 700 }}>
          {data.reduce((s, d) => s + d.percentage, 0)}%
        </text>
        <text x="70" y="82" textAnchor="middle" className="fill-slate-500" style={{ fontSize: '8px', fontWeight: 500, letterSpacing: '0.05em' }}>
          DISTRIBUTED
        </text>
      </svg>
      <div className="flex flex-col gap-1.5 min-w-0">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: d.color }} />
            <span className="text-[11px] font-medium text-slate-300 truncate">{d.label}</span>
            <span className="ml-auto text-[11px] font-mono text-slate-400 tnum">{d.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StarRow({ count, size = 12 }: { count: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < count ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}
        />
      ))}
    </span>
  );
}

export function UserProfileModal({ profile, onClose }: UserProfileModalProps) {
  const [tab, setTab] = useState<TabId>('listings');

  useEffect(() => {
    if (!profile) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [profile, onClose]);

  if (!profile) return null;

  const tabs: { id: TabId; label: string; icon: typeof Package; count: number }[] = [
    { id: 'listings', label: 'Active Listings', icon: Package, count: profile.activeListings.length },
    { id: 'history', label: 'Trade History', icon: ArrowLeftRight, count: profile.tradeHistory.length },
    { id: 'reviews', label: 'Reviews & Feedback', icon: MessageSquare, count: profile.reviews.length },
  ];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full sm:max-w-2xl sm:max-h-[92vh] bg-slate-900 sm:rounded-xl overflow-hidden border border-slate-700/60 flex flex-col animate-[scaleIn_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-md bg-slate-800/90 backdrop-blur flex items-center justify-center hover:bg-slate-700 transition-colors border border-slate-700"
        >
          <X size={16} className="text-slate-300" />
        </button>

        <div className="overflow-y-auto">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-slate-700/60 bg-slate-800/40">
            <div className="flex items-start gap-4">
              <div className="relative flex-shrink-0">
                <span className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center text-xl font-bold text-white border border-slate-600">
                  {profile.name.charAt(0)}
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-800" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white tracking-tight">{profile.name}</h2>
                  {profile.verified && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-semibold text-emerald-400">
                      <BadgeCheck size={11} /> Verified Trader
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1 text-[12px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin size={11} className="text-slate-500" /> {profile.location}
                  </span>
                  <span className="text-slate-600">|</span>
                  <span className="text-slate-500">Member since {profile.memberSince}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-px bg-slate-700/60 border-b border-slate-700/60">
            {[
              { label: 'Trust Score', value: `${profile.trustScore}%`, icon: ShieldCheck, color: 'text-emerald-400' },
              { label: 'Total Swaps', value: `${profile.totalSwaps}`, icon: ArrowLeftRight, color: 'text-sky-400' },
              { label: 'Avg. Response', value: profile.avgResponseTime, icon: Zap, color: 'text-amber-400' },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex flex-col items-center gap-1 py-4 bg-slate-900">
                  <Icon size={16} className={s.color} />
                  <span className="text-xl font-bold text-white tnum leading-none">{s.value}</span>
                  <span className="text-[9px] uppercase tracking-wide text-slate-500">{s.label}</span>
                </div>
              );
            })}
          </div>

          {/* Charts */}
          <div className="p-5 sm:p-6 space-y-5 border-b border-slate-700/60">
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                Monthly Trading Activity
              </h3>
              <div className="rounded-lg border border-slate-700/60 bg-slate-800/40 p-3">
                <LineChart data={profile.monthlyActivity} />
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                Asset Category Distribution
              </h3>
              <div className="rounded-lg border border-slate-700/60 bg-slate-800/40 p-4">
                <DonutChart data={profile.categoryDistribution} />
              </div>
            </div>
          </div>

          {/* Tab navigation */}
          <div className="flex items-center gap-1 px-4 sm:px-6 pt-4 border-b border-slate-700/60">
            {tabs.map((t) => {
              const Icon = t.icon;
              const isOn = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-1.5 px-3 py-2.5 text-[12px] font-medium whitespace-nowrap transition-all border-b-2 -mb-px ${
                    isOn
                      ? 'text-white border-emerald-400'
                      : 'text-slate-500 border-transparent hover:text-slate-300'
                  }`}
                >
                  <Icon size={13} />
                  {t.label}
                  <span className={`text-[10px] tnum px-1.5 py-0.5 rounded ${isOn ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                    {t.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <div className="p-5 sm:p-6">
            {tab === 'listings' && (
              <div className="space-y-2">
                {profile.activeListings.map((l, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg border border-slate-700/60 bg-slate-800/40 p-3 hover:border-slate-600 transition-colors"
                  >
                    <Package size={15} className="text-slate-500 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold text-slate-200 truncate">{l.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <ConditionBars tier={l.matchRate >= 90 ? 5 : l.matchRate >= 80 ? 4 : 3} size="sm" theme="dark" />
                        <p className="text-[11px] text-slate-500 flex items-center gap-1">
                          <MapPin size={9} /> {l.suburb}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                      <span className="text-[13px] font-semibold text-slate-200 tnum">{l.value}</span>
                      <span className="text-[10px] font-mono text-emerald-400 tnum">{l.matchRate}% match</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'history' && (
              <div className="space-y-2">
                {profile.tradeHistory.map((t, i) => (
                  <div key={i} className="rounded-lg border border-slate-700/60 bg-slate-800/40 p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono text-slate-500 tnum">{t.date}</span>
                      <StarRow count={t.rating} size={10} />
                    </div>
                    <div className="flex items-center gap-2 text-[12px]">
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] uppercase tracking-wide text-slate-600 mb-0.5">Gave</p>
                        <p className="text-slate-300 font-medium truncate">{t.gaveItem}</p>
                      </div>
                      <ArrowLeftRight size={14} className="text-slate-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0 text-right">
                        <p className="text-[9px] uppercase tracking-wide text-slate-600 mb-0.5">Received</p>
                        <p className="text-slate-300 font-medium truncate">{t.receivedItem}</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-2">Traded with <span className="text-slate-400 font-medium">{t.partner}</span></p>
                  </div>
                ))}
              </div>
            )}

            {tab === 'reviews' && (
              <div className="space-y-2.5">
                {profile.reviews.map((r, i) => (
                  <div key={i} className="rounded-lg border border-slate-700/60 bg-slate-800/40 p-3.5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[9px] font-bold text-slate-300">
                          {r.author.charAt(0)}
                        </span>
                        <span className="text-[12px] font-semibold text-slate-300">{r.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <StarRow count={r.rating} size={10} />
                        <span className="text-[10px] text-slate-600 tnum">{r.date}</span>
                      </div>
                    </div>
                    <p className="text-[12px] text-slate-400 leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
