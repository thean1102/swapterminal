import { useEffect, useState, useRef } from 'react';
import { X, Upload, Image as ImageIcon, Check, Tag, DollarSign, MapPin, Repeat2, Package, Zap } from 'lucide-react';
import type { TradeItem, SubCategoryId } from '@/data/items';
import { ConditionSelector, conditionOptions, type ConditionTier } from '@/components/ConditionBars';

export interface ListingForm {
  title: string;
  estimatedValue: string;
  condition: string;
  suburb: string;
  lookingFor: string;
  imageUrl: string;
}

const SUBURBS = ['Cabramatta', 'Parramatta', 'Liverpool', 'Chatswood', 'Bankstown', 'Newtown'];
const PLACEHOLDER_IMG = 'https://images.pexels.com/photos/4169358/pexels-photo-4169358.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const tierToScore: Record<ConditionTier, number> = { 1: 50, 2: 70, 3: 85, 4: 96, 5: 100 };

interface CreateListingModalProps {
  open: boolean;
  onClose: () => void;
  onPublish: (item: TradeItem) => void;
}

export function CreateListingModal({ open, onClose, onPublish }: CreateListingModalProps) {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [conditionTier, setConditionTier] = useState<ConditionTier>(4);
  const [suburb, setSuburb] = useState(SUBURBS[0]);
  const [lookingFor, setLookingFor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setTitle('');
      setValue('');
      setConditionTier(4);
      setSuburb(SUBURBS[0]);
      setLookingFor('');
      setImageUrl('');
      setFilePreview(null);
      setErrors({});
    }
  }, [open]);

  if (!open) return null;

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFilePreview(reader.result as string);
      setImageUrl('');
    };
    reader.readAsDataURL(file);
  };

  const previewImg = filePreview || imageUrl || PLACEHOLDER_IMG;

  const conditionLabel = conditionOptions.find((o) => o.tier === conditionTier)?.label ?? '';

  const aiAutoFill = () => {
    const samples = [
      { title: 'Sony WH-1000XM5 Headphones', value: '380', lookingFor: 'Gaming mouse + keyboard combo', tier: 4 as ConditionTier },
      { title: 'Nintendo Switch OLED + 4 Games', value: '300', lookingFor: 'iPad mini or AirPods Pro', tier: 4 as ConditionTier },
      { title: 'IKEA Markus Office Chair', value: '150', lookingFor: 'Standing desk or bookshelf', tier: 3 as ConditionTier },
      { title: 'GoPro Hero 11 + Accessories', value: '420', lookingFor: 'Drone or action camera lens', tier: 5 as ConditionTier },
    ];
    const pick = samples[Math.floor(Math.random() * samples.length)];
    setTitle(pick.title);
    setValue(pick.value);
    setLookingFor(pick.lookingFor);
    setConditionTier(pick.tier);
    setSuburb(SUBURBS[Math.floor(Math.random() * SUBURBS.length)]);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = 'Required';
    if (!value.trim()) errs.value = 'Required';
    else if (isNaN(Number(value.replace(/[^0-9.]/g, '')))) errs.value = 'Must be a number';
    if (!lookingFor.trim()) errs.lookingFor = 'Required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const publish = () => {
    if (!validate()) return;
    const score = tierToScore[conditionTier];
    const newItem: TradeItem = {
      id: `user-${Date.now()}`,
      title: title.trim(),
      category: 'items',
      owner: 'You',
      suburb,
      location: `${suburb}, NSW`,
      distanceKm: 0,
      condition: conditionLabel,
      conditionScore: score,
      estimatedValue: `${value.replace(/[^0-9.]/g, '')}`,
      matchRate: 88,
      totalTrades: 0,
      views: 0,
      lookingFor: lookingFor.trim(),
      description: `${title.trim()} — listed by you. Condition: ${conditionLabel}. Located in ${suburb}, NSW.`,
      images: [previewImg],
      subCategory: 'home-appliances' as SubCategoryId,
    };
    onPublish(newItem);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[55] flex items-center justify-center p-0 sm:p-4 bg-ink-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      <div
        className="relative bg-surface w-full h-full sm:max-w-lg sm:max-h-[92vh] sm:rounded-xl overflow-hidden border border-line flex flex-col animate-[scaleIn_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-line bg-surface">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-md bg-ink-900 flex items-center justify-center text-white">
              <Package size={14} />
            </span>
            <h2 className="text-[15px] font-bold text-ink-900 tracking-tight">List an item for trade</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-md hover:bg-lineSoft flex items-center justify-center text-ink-500 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-5 flex flex-col gap-4">
          {/* Image preview + upload */}
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-wider text-ink-400 mb-2 block">
              Item Image
            </label>
            <div className="flex items-center gap-3">
              <div className="w-24 h-24 rounded-lg border border-line bg-lineSoft overflow-hidden flex-shrink-0">
                <img src={previewImg} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <button
                  onClick={() => fileRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-line bg-surface hover:border-ink-400/50 hover:bg-lineSoft/60 text-[12px] font-medium text-ink-700 transition-colors"
                >
                  <Upload size={13} /> Upload file
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="hidden"
                />
                <div className="flex items-center gap-1.5">
                  <ImageIcon size={12} className="text-ink-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setFilePreview(null);
                    }}
                    placeholder="or paste image URL..."
                    className="flex-1 text-[12px] text-ink-900 placeholder:text-ink-400 bg-lineSoft/60 border border-line rounded-md px-2.5 py-1.5 outline-none focus:border-ink-400/60"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-wider text-ink-400 mb-1.5 flex items-center gap-1">
              <Tag size={10} /> Item Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Sony WH-1000XM5 Headphones"
              className={`w-full text-[13px] text-ink-900 placeholder:text-ink-400 bg-lineSoft/60 border rounded-lg px-3 py-2.5 outline-none focus:border-ink-400/60 transition-colors ${errors.title ? 'border-red-400' : 'border-line'}`}
            />
            {errors.title && <p className="text-[10px] text-red-500 mt-1">{errors.title}</p>}
          </div>

          {/* Value */}
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-wider text-ink-400 mb-1.5 flex items-center gap-1">
              <DollarSign size={10} /> Estimated Value
            </label>
            <div className={`flex items-center bg-lineSoft/60 border rounded-lg px-3 py-2.5 ${errors.value ? 'border-red-400' : 'border-line'} focus-within:border-ink-400/60 transition-colors`}>
              <span className="text-[13px] text-ink-400 font-mono">$</span>
              <input
                type="text"
                inputMode="numeric"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="750"
                className="w-full bg-transparent text-[13px] text-ink-900 placeholder:text-ink-400 outline-none px-1 tnum"
              />
            </div>
            {errors.value && <p className="text-[10px] text-red-500 mt-1">{errors.value}</p>}
          </div>

          {/* Condition selector */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">
                Condition
              </label>
              <button
                type="button"
                onClick={aiAutoFill}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-50 border border-amber-200 text-[10px] font-semibold text-amber-700 hover:bg-amber-100 transition-colors"
              >
                <Zap size={9} className="fill-amber-500 text-amber-500" />
                Auto-Fill Sample with AI
              </button>
            </div>
            <ConditionSelector tier={conditionTier} onChange={(t) => setConditionTier(t)} />
          </div>

          {/* Suburb */}
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-wider text-ink-400 mb-1.5 flex items-center gap-1">
              <MapPin size={10} /> Suburb Location
            </label>
            <select
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
              className="w-full text-[13px] text-ink-900 bg-lineSoft/60 border border-line rounded-lg px-3 py-2.5 outline-none focus:border-ink-400/60 transition-colors cursor-pointer"
            >
              {SUBURBS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Looking For */}
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-wider text-ink-400 mb-1.5 flex items-center gap-1">
              <Repeat2 size={10} /> Looking to Trade For
            </label>
            <input
              type="text"
              value={lookingFor}
              onChange={(e) => setLookingFor(e.target.value)}
              placeholder="e.g. Mechanical keyboard or gaming monitor"
              className={`w-full text-[13px] text-ink-900 placeholder:text-ink-400 bg-lineSoft/60 border rounded-lg px-3 py-2.5 outline-none focus:border-ink-400/60 transition-colors ${errors.lookingFor ? 'border-red-400' : 'border-line'}`}
            />
            {errors.lookingFor && <p className="text-[10px] text-red-500 mt-1">{errors.lookingFor}</p>}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-line bg-surface flex items-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg border border-line text-[13px] font-medium text-ink-500 hover:text-ink-900 hover:bg-lineSoft/60 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={publish}
            className="flex-1 py-2.5 rounded-lg bg-ink-900 hover:bg-ink-700 active:scale-[0.99] transition-all text-white font-semibold text-[13px] flex items-center justify-center gap-2"
          >
            <Check size={15} /> Publish Trade
          </button>
        </div>
      </div>
    </div>
  );
}
