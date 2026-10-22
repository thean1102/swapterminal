export type ConditionTier = 1 | 2 | 3 | 4 | 5;

export interface ConditionOption {
  label: string;
  tier: ConditionTier;
}

export const conditionOptions: ConditionOption[] = [
  { label: 'Parts Only', tier: 1 },
  { label: 'Heavily Used', tier: 2 },
  { label: 'Fair / Good', tier: 3 },
  { label: 'Like New', tier: 4 },
  { label: 'Brand New', tier: 5 },
];

const tierColors: Record<ConditionTier, string> = {
  5: 'bg-emerald-500',
  4: 'bg-lime-400',
  3: 'bg-amber-400',
  2: 'bg-orange-500',
  1: 'bg-red-500',
};

export function conditionToTier(condition: string, score: number): ConditionTier {
  const s = score ?? 0;
  if (s >= 100 || condition === 'Brand New' || condition === 'Mint') return 5;
  if (s >= 90 || condition === 'Like New') return 4;
  if (s >= 80 || condition === 'Good' || condition === 'Fair') return 3;
  if (s >= 60) return 2;
  return 1;
}

interface ConditionBarsProps {
  tier: ConditionTier;
  size?: 'sm' | 'md';
  theme?: 'light' | 'dark';
}

export function ConditionBars({ tier, size = 'md', theme = 'light' }: ConditionBarsProps) {
  const dims = size === 'sm'
    ? { w: 'w-[14px]', h: 'h-[7px]', gap: 'gap-[2px]' }
    : { w: 'w-[20px]', h: 'h-[10px]', gap: 'gap-[3px]' };

  return (
    <div className={`inline-flex items-center ${dims.gap}`}>
      {([1, 2, 3, 4, 5] as ConditionTier[]).map((t) => {
        const active = t <= tier;
        return (
          <span
            key={t}
            className={`${dims.w} ${dims.h} rounded-[2px] transition-colors ${
              active
                ? tierColors[tier]
                : theme === 'dark'
                  ? 'bg-slate-800 border border-slate-700'
                  : 'bg-slate-200 border border-slate-300'
            }`}
          />
        );
      })}
    </div>
  );
}

interface ConditionSelectorProps {
  tier: ConditionTier;
  onChange: (tier: ConditionTier, label: string) => void;
}

export function ConditionSelector({ tier, onChange }: ConditionSelectorProps) {
  return (
    <div className="space-y-1.5">
      {conditionOptions.map((opt) => {
        const isOn = opt.tier === tier;
        return (
          <button
            key={opt.tier}
            type="button"
            onClick={() => onChange(opt.tier, opt.label)}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg border transition-colors text-left ${
              isOn
                ? 'border-ink-900 bg-ink-900 text-white'
                : 'border-line bg-lineSoft/60 text-ink-700 hover:border-ink-400/50 hover:bg-lineSoft'
            }`}
          >
            <span className="text-[10px] font-mono font-bold w-4 text-center tnum flex-shrink-0">
              {opt.tier}/5
            </span>
            <ConditionBars tier={opt.tier} size="md" theme={isOn ? 'dark' : 'light'} />
            <span className={`text-[12px] font-semibold ${isOn ? 'text-white' : 'text-ink-700'}`}>
              {opt.label}
            </span>
            {isOn && <span className="ml-auto text-[10px] font-medium text-emerald-400">Selected</span>}
          </button>
        );
      })}
    </div>
  );
}
