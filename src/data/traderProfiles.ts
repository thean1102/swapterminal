export interface TraderProfile {
  name: string;
  suburb: string;
  location: string;
  memberSince: string;
  verified: boolean;
  trustScore: number;
  totalSwaps: number;
  avgResponseTime: string;
  responseRate: number;
  rating: number;
  ratingCount: number;
  monthlyActivity: { month: string; swaps: number }[];
  categoryDistribution: { label: string; percentage: number; color: string }[];
  activeListings: {
    title: string;
    value: string;
    suburb: string;
    matchRate: number;
  }[];
  tradeHistory: {
    date: string;
    gaveItem: string;
    receivedItem: string;
    partner: string;
    rating: number;
  }[];
  reviews: {
    author: string;
    date: string;
    rating: number;
    text: string;
  }[];
}

export interface ProfileListing {
  title: string;
  value: string;
  suburb: string;
  matchRate: number;
}

export function generateTraderProfile(
  owner: string,
  suburb: string,
  extraListings: ProfileListing[] = [],
): TraderProfile {
  return {
    name: owner,
    suburb,
    location: `${suburb}, Sydney`,
    memberSince: 'Mar 2024',
    verified: true,
    trustScore: 98,
    totalSwaps: 24,
    avgResponseTime: '<15m',
    responseRate: 98,
    rating: 4.9,
    ratingCount: 7,
    monthlyActivity: [
      { month: 'Jan', swaps: 1 },
      { month: 'Feb', swaps: 2 },
      { month: 'Mar', swaps: 3 },
      { month: 'Apr', swaps: 2 },
      { month: 'May', swaps: 4 },
      { month: 'Jun', swaps: 3 },
      { month: 'Jul', swaps: 5 },
      { month: 'Aug', swaps: 2 },
      { month: 'Sep', swaps: 1 },
      { month: 'Oct', swaps: 1 },
    ],
    categoryDistribution: [
      { label: 'Electronics', percentage: 40, color: '#2E9C6A' },
      { label: 'Auto Parts', percentage: 30, color: '#3B82F6' },
      { label: 'Apparel', percentage: 20, color: '#F59E0B' },
      { label: 'Other', percentage: 10, color: '#8B5CF6' },
    ],
    activeListings: [
      { title: 'Xiaomi Electric Scooter Pro 2', value: '$750', suburb, matchRate: 81 },
      { title: 'Canon EOS R6 + 24-105 Lens', value: '$1,950', suburb, matchRate: 90 },
      { title: 'Samsung 55" 4K Smart TV', value: '$450', suburb, matchRate: 68 },
      ...extraListings,
    ],
    tradeHistory: [
      { date: 'Oct 2026', gaveItem: 'Bluetooth Speaker', receivedItem: 'Desk Lamp', partner: 'Marcus T.', rating: 5 },
      { date: 'Sep 2026', gaveItem: 'Old Phone', receivedItem: 'Plant Pots', partner: 'Lila F.', rating: 5 },
      { date: 'Aug 2026', gaveItem: 'Keyboard', receivedItem: 'Mouse + Pad', partner: 'Theo L.', rating: 4 },
      { date: 'Jul 2026', gaveItem: 'Camera Bag', receivedItem: 'Tripod', partner: 'Hugo M.', rating: 5 },
      { date: 'Jun 2026', gaveItem: 'Headphones', receivedItem: 'Vinyl x3', partner: 'Greta O.', rating: 5 },
    ],
    reviews: [
      { author: 'Marcus T.', date: 'Oct 2026', rating: 5, text: 'Quick response, smooth swap. Item exactly as described. Would trade again.' },
      { author: 'Lila F.', date: 'Sep 2026', rating: 5, text: 'Very friendly and flexible with timing. The phone was in better condition than expected.' },
      { author: 'Theo L.', date: 'Aug 2026', rating: 4, text: 'Good trade overall, took a little while to confirm but great communication throughout.' },
      { author: 'Hugo M.', date: 'Jul 2026', rating: 5, text: 'Excellent trader. Met up on time, everything was clean and well packed. Highly recommended.' },
    ],
  };
}
