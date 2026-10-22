import { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { ItemCard } from '@/components/ItemCard';
import type { TradeItem } from '@/data/items';

interface Props {
  suburbs: string[];
  items: TradeItem[];
  onOpen: (item: TradeItem) => void;
  onSelectSuburb: (suburb: string) => void;
}

function SuburbRow({
  suburb,
  suburbItems,
  onOpen,
  onSelectSuburb,
}: {
  suburb: string;
  suburbItems: TradeItem[];
  onOpen: (item: TradeItem) => void;
  onSelectSuburb: (suburb: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => onSelectSuburb(suburb)}
          className="group inline-flex items-center gap-1.5"
        >
          <h3 className="text-[15px] font-semibold text-ink-900 tracking-tight group-hover:text-ink-700 transition-colors">
            {suburb}
          </h3>
          <ArrowRight size={15} className="text-ink-400 group-hover:text-ink-900 group-hover:translate-x-0.5 transition-all" />
          <span className="text-[11px] text-ink-400 tnum ml-1">
            {suburbItems.length} {suburbItems.length === 1 ? 'listing' : 'listings'}
          </span>
        </button>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label={`Scroll ${suburb} left`}
            className="w-7 h-7 rounded-md border border-line bg-surface flex items-center justify-center text-ink-500 hover:border-ink-400/50 hover:text-ink-900 hover:bg-lineSoft/60 transition-colors"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label={`Scroll ${suburb} right`}
            className="w-7 h-7 rounded-md border border-line bg-surface flex items-center justify-center text-ink-500 hover:border-ink-400/50 hover:text-ink-900 hover:bg-lineSoft/60 transition-colors"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1"
      >
        {suburbItems.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-[200px] xs:w-[210px]"
          >
            <ItemCard item={item} onOpen={onOpen} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function StayNearGrouped({ suburbs, items, onOpen, onSelectSuburb }: Props) {
  const sections = suburbs
    .map((suburb) => ({
      suburb,
      suburbItems: items.filter((it) => it.suburb === suburb),
    }))
    .filter((s) => s.suburbItems.length > 0);

  if (sections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center border border-line rounded-xl bg-surface">
        <p className="font-semibold text-ink-900 text-sm">No listings found</p>
        <p className="text-[11px] text-ink-500 mt-1">Try a different search or check back later.</p>
      </div>
    );
  }

  return (
    <div>
      {sections.map((s) => (
        <SuburbRow
          key={s.suburb}
          suburb={s.suburb}
          suburbItems={s.suburbItems}
          onOpen={onOpen}
          onSelectSuburb={onSelectSuburb}
        />
      ))}
    </div>
  );
}
