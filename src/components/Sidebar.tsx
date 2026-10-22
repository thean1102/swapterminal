import { ArrowRight, Lightbulb, ListPlus, MapPin, Sparkles } from 'lucide-react';

const activeSuburbs = [
  { name: 'Cabramatta', swaps: 317 },
  { name: 'Parramatta', swaps: 162 },
  { name: 'Chatswood', swaps: 95 },
  { name: 'Liverpool', swaps: 88 },
  { name: 'Bankstown', swaps: 64 },
];

export function Sidebar({ onAddTrade }: { onAddTrade?: () => void }) {
  return (
    <aside className="hidden lg:block lg:col-span-3">
      <div className="sticky top-[7.5rem] space-y-4">
        <section className="rounded-xl border border-line bg-surface p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[13px] font-semibold text-ink-900">Quick Actions</h2>
            <span className="text-[9px] font-semibold uppercase tracking-wider text-ink-400">Tools</span>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={onAddTrade}
              className="group w-full flex items-center gap-3 rounded-lg border border-line px-3 py-3 text-left hover:border-ink-400/60 hover:bg-lineSoft/50 transition-colors"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-ink-900 text-white">
                <ListPlus size={15} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12px] font-semibold text-ink-900">Đăng món đồ muốn đổi</span>
                <span className="mt-0.5 block text-[10px] text-ink-400">List an item for trade</span>
              </span>
              <ArrowRight size={14} className="shrink-0 text-ink-400 transition-transform group-hover:translate-x-0.5" />
            </button>

            <button
              type="button"
              className="group w-full flex items-center gap-3 rounded-lg border border-line px-3 py-3 text-left hover:border-ink-400/60 hover:bg-lineSoft/50 transition-colors"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-line bg-lineSoft text-ink-700">
                <Sparkles size={15} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12px] font-semibold text-ink-900">Gợi ý khớp lệnh AI</span>
                <span className="mt-0.5 block text-[10px] text-ink-400">Find your best matches</span>
              </span>
              <ArrowRight size={14} className="shrink-0 text-ink-400 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </section>

        <section className="rounded-xl border border-line bg-surface p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-[13px] font-semibold text-ink-900">Top Active Suburbs</h2>
              <p className="mt-0.5 text-[10px] text-ink-400">in Sydney</p>
            </div>
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-lineSoft text-ink-500">
              <MapPin size={14} />
            </span>
          </div>

          <div className="divide-y divide-lineSoft">
            {activeSuburbs.map((suburb, index) => (
              <div key={suburb.name} className="flex items-center gap-2.5 py-2.5 first:pt-1">
                <span className="w-4 text-[10px] font-semibold text-ink-400 tnum">0{index + 1}</span>
                <span className="flex-1 text-[12px] font-medium text-ink-700">{suburb.name}</span>
                <span className="flex items-center gap-1 text-[10px] font-mono text-ink-400 tnum">
                  <Lightbulb size={10} className="text-ink-400" />
                  {suburb.swaps} swaps
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-1 border-t border-lineSoft pt-3 text-[10px] font-medium text-ink-400">
            <span className="h-1.5 w-1.5 rounded-full bg-odds-up" />
            Updated from live activity
          </div>
        </section>
      </div>
    </aside>
  );
}
