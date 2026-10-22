import {
  LayoutGrid,
  Cpu,
  Shirt,
  Wrench,
  Dumbbell,
  Tent,
  Watch,
  HousePlug,
  type LucideIcon,
} from 'lucide-react';
import { subCategories, type SubCategoryId } from '@/data/items';

const iconMap: Record<SubCategoryId, LucideIcon> = {
  all: LayoutGrid,
  'electronics-tech': Cpu,
  'apparel-shoes': Shirt,
  'car-parts-auto': Wrench,
  'sports-fitness': Dumbbell,
  'outdoor-camping': Tent,
  'watches-jewelry': Watch,
  'home-appliances': HousePlug,
};

interface Props {
  active: SubCategoryId;
  onChange: (id: SubCategoryId) => void;
}

export function ItemsSidebar({ active, onChange }: Props) {
  return (
    <aside className="hidden lg:block lg:col-span-3">
      <div className="sticky top-[7.5rem]">
        <section className="rounded-xl border border-line bg-surface p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[13px] font-semibold text-ink-900">Categories</h2>
            <span className="text-[9px] font-semibold uppercase tracking-wider text-ink-400">Filter</span>
          </div>

          <div className="space-y-0.5">
            {subCategories.map((cat) => {
              const Icon = iconMap[cat.id];
              const isActive = active === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onChange(cat.id)}
                  className={[
                    'group w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors',
                    isActive
                      ? 'bg-ink-900 text-white'
                      : 'text-ink-700 hover:bg-lineSoft/60',
                  ].join(' ')}
                >
                  <Icon
                    size={15}
                    className={isActive ? 'text-white' : 'text-ink-400 group-hover:text-ink-700'}
                  />
                  <span className="text-[12px] font-medium">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </aside>
  );
}
