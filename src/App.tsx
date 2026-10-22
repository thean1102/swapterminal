import { useMemo, useState } from 'react';
import { Info, Check } from 'lucide-react';
import { Header } from '@/components/Header';
import { CategoryBar } from '@/components/CategoryBar';
import { ItemCard } from '@/components/ItemCard';
import { QuickViewModal } from '@/components/QuickViewModal';
import { UserProfileModal } from '@/components/UserProfileModal';
import { CreateListingModal } from '@/components/CreateListingModal';
import { Sidebar } from '@/components/Sidebar';
import { ItemsSidebar } from '@/components/ItemsSidebar';
import { StayNearGrouped } from '@/components/StayNearGrouped';
import { generateTraderProfile, type TraderProfile, type ProfileListing } from '@/data/traderProfiles';
import { items, stayNearSuburbs, type CategoryId, type SubCategoryId, type TradeItem } from '@/data/items';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('popular');
  const [activeSuburbs, setActiveSuburbs] = useState<string[]>([]);
  const [selected, setSelected] = useState<TradeItem | null>(null);
  const [profile, setProfile] = useState<TraderProfile | null>(null);
  const [query, setQuery] = useState('');
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategoryId>('all');
  const [userListings, setUserListings] = useState<TradeItem[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [toast, setToast] = useState(false);

  const handleSelectCategory = (id: CategoryId) => {
    setActiveCategory(id);
    if (id === 'popular') setActiveSuburbs([]);
    if (id !== 'items') setActiveSubCategory('all');
  };

  const handleToggleSuburb = (suburb: string) => {
    setActiveSuburbs((prev) =>
      prev.includes(suburb) ? prev.filter((s) => s !== suburb) : [...prev, suburb]
    );
  };

  const handleClearSuburbs = () => setActiveSuburbs([]);

  const hasActiveSuburbs = activeSuburbs.length > 0;

  const allItems = useMemo(() => [...userListings, ...items], [userListings]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allItems.filter((it) => {
      if (activeCategory === 'popular') {
        if (!it.popular && !userListings.includes(it)) return false;
      } else if (activeCategory === 'free-trade') {
        if (!it.freeTrade) return false;
      } else if (hasActiveSuburbs && !activeSuburbs.includes(it.suburb)) return false;

      if (activeSubCategory !== 'all' && it.subCategory !== activeSubCategory) return false;

      if (q) {
        const haystack = `${it.title} ${it.lookingFor ?? ''} ${it.location} ${it.suburb} ${it.owner}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [activeCategory, activeSuburbs, hasActiveSuburbs, activeSubCategory, query, allItems, userListings]);

  const heading = useMemo(() => {
    if (activeCategory === 'popular') return 'Popular trades right now';
    if (activeCategory === 'stay-near') return hasActiveSuburbs ? `Stay near — ${activeSuburbs.length} suburb${activeSuburbs.length > 1 ? 's' : ''} selected` : 'Stay near — pick a suburb';
    if (activeCategory === 'free-trade') return hasActiveSuburbs ? `Free trade near ${activeSuburbs.join(', ')}` : 'Free Trade — swap anything, they accept';
    return hasActiveSuburbs ? `Items near ${activeSuburbs.join(', ')}` : 'All items up for swap';
  }, [activeCategory, activeSuburbs, hasActiveSuburbs]);

  const handleShowProfile = (owner: string, suburb: string) => {
    const extraListings: ProfileListing[] = userListings
      .filter((it) => it.owner === owner)
      .map((it) => ({ title: it.title, value: it.estimatedValue, suburb: it.suburb, matchRate: it.matchRate }));
    setProfile(generateTraderProfile(owner, suburb, extraListings));
  };

  const handlePublish = (item: TradeItem) => {
    setUserListings((prev) => [item, ...prev]);
    setToast(true);
    setTimeout(() => setToast(false), 3000);
    setActiveCategory('items');
  };

  return (
    <div className="min-h-screen bg-canvas text-ink-900">
      <Header query={query} onQueryChange={setQuery} />

      <CategoryBar
        active={activeCategory}
        onChange={handleSelectCategory}
        activeSuburbs={activeSuburbs}
        suburbs={stayNearSuburbs}
        onToggleSuburb={handleToggleSuburb}
        onClearSuburbs={handleClearSuburbs}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-start">
          <section className="lg:col-span-7 min-w-0">
        {/* Page header */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-ink-900 tracking-tight">{heading}</h2>
            {activeCategory !== 'stay-near' && (
              <p className="text-[11px] text-ink-400 mt-0.5 tnum">
                {filtered.length} {filtered.length === 1 ? 'listing' : 'listings'} · live feed
              </p>
            )}
          </div>
        </div>

        {/* Free Trade info card — flat institutional style */}
        {activeCategory === 'free-trade' && (
          <div className="mb-5 p-3.5 rounded-xl border border-line bg-surface flex items-start gap-3">
            <span className="w-7 h-7 rounded-md bg-lineSoft border border-line flex items-center justify-center text-ink-500 flex-shrink-0">
              <Info size={14} />
            </span>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-ink-900">How Free Trade works</p>
              <p className="text-[11px] text-ink-500 mt-0.5 leading-relaxed">
                These owners did not specify what they want. Tap any listing and offer your own item — they will review and accept or pass. No haggling, just proposals.
              </p>
            </div>
          </div>
        )}

        {activeCategory === 'stay-near' && !hasActiveSuburbs ? (
          <StayNearGrouped
            suburbs={stayNearSuburbs}
            items={filtered}
            onOpen={setSelected}
            onSelectSuburb={handleToggleSuburb}
          />
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-line rounded-xl bg-surface">
            <p className="font-semibold text-ink-900 text-sm">No matches found</p>
            <p className="text-[11px] text-ink-500 mt-1">Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-4">
            {filtered.map((item) => (
              <ItemCard key={item.id} item={item} onOpen={setSelected} highlight={item.popular && activeCategory === 'popular'} onAddTrade={() => setShowCreate(true)} />
            ))}
          </div>
        )}

        <footer className="mt-16 pt-6 border-t border-line text-center text-[11px] text-ink-400">
          <p>&copy; 2026 Swap Terminal — a demo trading marketplace. Data is illustrative.</p>
        </footer>
          </section>

          {activeCategory === 'items' ? (
            <ItemsSidebar active={activeSubCategory} onChange={setActiveSubCategory} />
          ) : (
            <Sidebar onAddTrade={() => setShowCreate(true)} />
          )}
        </div>
      </main>

      <QuickViewModal item={selected} onClose={() => setSelected(null)} onShowProfile={handleShowProfile} />
      <UserProfileModal profile={profile} onClose={() => setProfile(null)} />
      <CreateListingModal open={showCreate} onClose={() => setShowCreate(false)} onPublish={handlePublish} />

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] px-4 py-2.5 rounded-lg bg-ink-900 text-white text-[13px] font-medium flex items-center gap-2 animate-[scaleIn_0.2s_ease-out] border border-ink-700 shadow-lg">
          <Check size={15} className="text-odds-up" />
          Trade item listed successfully!
        </div>
      )}
    </div>
  );
}
