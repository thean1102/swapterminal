import { Flame, MapPin, Package, Gift, type LucideIcon } from 'lucide-react';

export type CategoryId = 'popular' | 'stay-near' | 'items' | 'free-trade';

export type SubCategoryId =
  | 'all'
  | 'electronics-tech'
  | 'apparel-shoes'
  | 'car-parts-auto'
  | 'sports-fitness'
  | 'outdoor-camping'
  | 'watches-jewelry'
  | 'home-appliances';

export interface SubCategory {
  id: SubCategoryId;
  label: string;
}

export const subCategories: SubCategory[] = [
  { id: 'all', label: 'All Categories' },
  { id: 'electronics-tech', label: 'Electronics & Tech' },
  { id: 'apparel-shoes', label: 'Apparel & Shoes' },
  { id: 'car-parts-auto', label: 'Car Parts & Auto' },
  { id: 'sports-fitness', label: 'Sports & Fitness' },
  { id: 'outdoor-camping', label: 'Outdoor & Camping' },
  { id: 'watches-jewelry', label: 'Watches & Jewelry' },
  { id: 'home-appliances', label: 'Home & Appliances' },
];

export interface Category {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
}

export const categories: Category[] = [
  { id: 'popular', label: 'Popular Trades', icon: Flame },
  { id: 'stay-near', label: 'Stay Near', icon: MapPin },
  { id: 'items', label: 'Items', icon: Package },
  { id: 'free-trade', label: 'Free Trade', icon: Gift },
];

export const stayNearSuburbs: string[] = [
  'Cabramatta',
  'Liverpool',
  'Bankstown',
  'Parramatta',
  'Newtown',
  'Chatswood',
];

export interface TradeItem {
  id: string;
  title: string;
  category: 'items' | 'free-trade';
  owner: string;
  suburb: string;
  location: string;
  distanceKm: number;
  condition: string;
  conditionScore: number;
  estimatedValue: string;
  lookingFor?: string;
  description: string;
  images: string[];
  popular?: boolean;
  freeTrade?: boolean;
  matchRate: number;
  totalTrades: number;
  views: number;
  subCategory: SubCategoryId;
}

export const items: TradeItem[] = [
  {
    id: '1',
    title: 'ASUS ROG Gaming Laptop',
    category: 'items',
    owner: 'Marcus T.',
    suburb: 'Cabramatta',
    location: 'Cabramatta, NSW',
    distanceKm: 2.5,
    condition: 'Like New',
    conditionScore: 99,
    estimatedValue: '$2,400',
    matchRate: 92,
    totalTrades: 14,
    views: 1280,
    lookingFor: 'iPad Pro 12.9" or PS5 Slim',
    description:
      'Barely used 2024 ROG Zephyrus G14, Ryzen 9, RTX 4070, 32GB RAM, 1TB SSD. Original box and charger included. Selling because I switched to a desktop setup. Perfect for content creation and AAA gaming on the go.',
    popular: true,
    subCategory: 'electronics-tech',
    images: [
      'https://images.pexels.com/photos/3951449/pexels-photo-3951449.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/19012063/pexels-photo-19012063.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/30459254/pexels-photo-30459254.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    id: '2',
    title: 'Seiko Mechanical Skeleton Watch',
    category: 'items',
    owner: 'Eleanor R.',
    suburb: 'Chatswood',
    location: 'Chatswood, NSW',
    distanceKm: 0.8,
    condition: 'Mint',
    conditionScore: 97,
    estimatedValue: '$680',
    matchRate: 88,
    totalTrades: 9,
    views: 642,
    lookingFor: 'Vintage film camera or quality headphones',
    description:
      'Seiko Presage skeleton dial automatic. Worn fewer than ten times, kept in a watch box otherwise. Sapphire crystal is flawless. Comes with the original leather strap plus a stainless bracelet.',
    popular: true,
    subCategory: 'watches-jewelry',
    images: [
      'https://images.pexels.com/photos/7627873/pexels-photo-7627873.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/8839604/pexels-photo-8839604.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    id: '3',
    title: 'Nike Air Jordan 1 Retro',
    category: 'items',
    owner: 'Devon K.',
    suburb: 'Liverpool',
    location: 'Liverpool, NSW',
    distanceKm: 1.4,
    condition: 'Good',
    conditionScore: 88,
    estimatedValue: '$520',
    matchRate: 76,
    totalTrades: 21,
    views: 905,
    lookingFor: 'Gaming laptop parts or collector sneakers',
    description:
      'Jordan 1 Retro High OG, size US 10. Worn for one season, soles and leather in great shape. Original box included, no major creasing. Willing to negotiate bundle for multiple pairs.',
    popular: true,
    subCategory: 'apparel-shoes',
    images: [
      'https://images.pexels.com/photos/4061385/pexels-photo-4061385.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/9251961/pexels-photo-9251961.png?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/1027130/pexels-photo-1027130.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    id: '4',
    title: 'Xiaomi Electric Scooter Pro 2',
    category: 'items',
    owner: 'Priya S.',
    suburb: 'Parramatta',
    location: 'Parramatta, NSW',
    distanceKm: 3.1,
    condition: 'Good',
    conditionScore: 90,
    estimatedValue: '$750',
    matchRate: 81,
    totalTrades: 7,
    views: 433,
    lookingFor: 'Mechanical keyboard setup or smart home gear',
    description:
      'Single owner, around 400km on the odomometer. 45km range, 25km/h top speed. New tires installed last month. Folds flat, fits under a desk. Great last-mile commuter — I just moved closer to work.',
    popular: true,
    subCategory: 'electronics-tech',
    images: [
      'https://images.pexels.com/photos/38484303/pexels-photo-38484303.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/39554967/pexels-photo-39554967.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/9168370/pexels-photo-9168370.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    id: '5',
    title: 'Canon EOS R6 + 24-105 Lens',
    category: 'items',
    owner: 'Hugo M.',
    suburb: 'Parramatta',
    location: 'Parramatta, NSW',
    distanceKm: 5.2,
    condition: 'Like New',
    conditionScore: 96,
    estimatedValue: '$1,950',
    matchRate: 90,
    totalTrades: 12,
    views: 1567,
    lookingFor: 'Drone (DJI Mavic 3) or trade toward a guitar',
    description:
      'Full-frame mirrorless, roughly 8k shutter actuations. Includes RF 24-105 f/4L lens, two batteries, 128GB SD card, and a Lowepro bag. Sensor is clean, no dust. Ideal hybrid photo/video body.',
    popular: true,
    subCategory: 'electronics-tech',
    images: [
      'https://images.pexels.com/photos/15111004/pexels-photo-15111004.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/17801168/pexels-photo-17801168.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/11713436/pexels-photo-11713436.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    id: '6',
    title: 'Vintage Vinyl Collection (60 LPs)',
    category: 'items',
    owner: 'Greta O.',
    suburb: 'Newtown',
    location: 'Newtown, NSW',
    distanceKm: 6.7,
    condition: 'Good',
    conditionScore: 85,
    estimatedValue: '$900',
    matchRate: 70,
    totalTrades: 18,
    views: 378,
    lookingFor: 'Turntable upgrade or framed art prints',
    subCategory: 'home-appliances',
    description:
      'Mixed lot of 60s–80s rock, jazz, and soul pressings. Mostly VG+ condition, a few mint originals. Includes Bowie, Fleetwood Mac, Coltrane. Full tracklist available on request. Would prefer local pickup.',
    images: [
      'https://images.pexels.com/photos/7831333/pexels-photo-7831333.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/6131929/pexels-photo-6131929.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/23834128/pexels-photo-23834128.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    id: '7',
    title: 'Custom RGB Mechanical Keyboard',
    category: 'items',
    owner: 'Theo L.',
    suburb: 'Newtown',
    location: 'Newtown, NSW',
    distanceKm: 2.0,
    condition: 'Mint',
    conditionScore: 98,
    estimatedValue: '$320',
    matchRate: 95,
    totalTrades: 5,
    views: 821,
    lookingFor: 'PS5 games or a 1440p monitor',
    description:
      'Custom-built 75% board with lubed tactile switches, PBT keycaps, and per-key RGB. Hot-swappable, gasket-mounted, thocky sound profile. Includes coiled aviator cable. A desk showpiece.',
    popular: true,
    subCategory: 'electronics-tech',
    images: [
      'https://images.pexels.com/photos/9020272/pexels-photo-9020272.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/5380584/pexels-photo-5380584.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/38948863/pexels-photo-38948863.png?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    id: '8',
    title: 'PS5 Slim + 2 Controllers',
    category: 'items',
    owner: 'Aisha B.',
    suburb: 'Bankstown',
    location: 'Bankstown, NSW',
    distanceKm: 4.3,
    condition: 'Good',
    conditionScore: 91,
    estimatedValue: '$620',
    matchRate: 84,
    totalTrades: 11,
    views: 1102,
    lookingFor: 'iPad or vintage film camera',
    description:
      'PS5 Slim Disc Edition, about a year old. Two DualSense controllers (one white, one midnight black), both holding charge well. Includes 3 games and original packaging. Upgrading to PC.',
    popular: true,
    subCategory: 'electronics-tech',
    images: [
      'https://images.pexels.com/photos/7871504/pexels-photo-7871504.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/1367000/pexels-photo-1367000.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/4523002/pexels-photo-4523002.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    id: '9',
    title: 'Leather Designer Handbag',
    category: 'items',
    owner: 'Nina V.',
    suburb: 'Chatswood',
    location: 'Chatswood, NSW',
    distanceKm: 1.1,
    condition: 'Like New',
    conditionScore: 95,
    estimatedValue: '$1,100',
    matchRate: 86,
    totalTrades: 6,
    views: 540,
    lookingFor: 'Gold jewelry or designer sunglasses',
    subCategory: 'apparel-shoes',
    description:
      'Full-grain leather shoulder bag, tan, with dust bag and authenticity card. Carried a handful of times, no scuffs on the corners. A versatile everyday piece that pairs with everything.',
    images: [
      'https://images.pexels.com/photos/9327162/pexels-photo-9327162.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/7953286/pexels-photo-7953286.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/8801036/pexels-photo-8801036.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    id: '10',
    title: 'Trek Mountain Bike (Dual Suspension)',
    category: 'items',
    owner: 'Jackson P.',
    suburb: 'Liverpool',
    location: 'Liverpool, NSW',
    distanceKm: 7.4,
    condition: 'Good',
    conditionScore: 87,
    estimatedValue: '$1,400',
    matchRate: 73,
    totalTrades: 15,
    views: 289,
    lookingFor: 'Surfboard or e-scooter + cash',
    subCategory: 'sports-fitness',
    description:
      'Trek Fuel EX 7, medium frame, recently serviced. New brake pads and chain, tubeless tires set up. Rides trails beautifully but I am moving to the coast and switching to surfing.',
    images: [
      'https://images.pexels.com/photos/36450314/pexels-photo-36450314.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/37897835/pexels-photo-37897835.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/9748609/pexels-photo-9748609.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    id: '11',
    title: 'DeWalt Cordless Drill Combo Kit',
    category: 'items',
    owner: 'Rafael D.',
    suburb: 'Cabramatta',
    location: 'Cabramatta, NSW',
    distanceKm: 3.8,
    condition: 'Good',
    conditionScore: 89,
    estimatedValue: '$440',
    matchRate: 79,
    totalTrades: 8,
    views: 367,
    lookingFor: 'Car detailing gear or camping equipment',
    subCategory: 'home-appliances',
    description:
      '20V MAX kit: drill, impact driver, circular saw, two batteries, charger, and hard case. Used on a single home renovation. Everything works, batteries still hold a full charge. Finished the project, no longer need it.',
    images: [
      'https://images.pexels.com/photos/3877525/pexels-photo-3877525.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/30413428/pexels-photo-30413428.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/5974048/pexels-photo-5974048.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    id: '12',
    title: 'Martin Acoustic Guitar (Steel String)',
    category: 'items',
    owner: 'Lila F.',
    suburb: 'Bankstown',
    location: 'Bankstown, NSW',
    distanceKm: 9.0,
    condition: 'Like New',
    conditionScore: 94,
    estimatedValue: '$1,300',
    matchRate: 91,
    totalTrades: 10,
    views: 745,
    lookingFor: 'Camera lens or synthesizer',
    subCategory: 'sports-fitness',
    description:
      'Martin D-15M, all-mahogany body, warm and rich tone. Lightly played, kept humidified in its hard case. Fresh strings, recently set up by a luthier. Sounds incredible for fingerstyle and strumming alike.',
    images: [
      'https://images.pexels.com/photos/10354611/pexels-photo-10354611.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/9057791/pexels-photo-9057791.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/35257326/pexels-photo-35257326.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    id: '13',
    title: 'Samsung 55" 4K Smart TV',
    category: 'free-trade',
    owner: 'Chris W.',
    suburb: 'Parramatta',
    location: 'Parramatta, NSW',
    distanceKm: 4.1,
    condition: 'Good',
    conditionScore: 84,
    estimatedValue: '$450',
    matchRate: 68,
    totalTrades: 3,
    views: 2103,
    freeTrade: true,
    subCategory: 'electronics-tech',
    description:
      'Samsung 55" Crystal UHD, works perfectly, just upgraded to a bigger OLED. No cracks, remote and stand included. Open to anything interesting — surprise me. Pickup only, it is a two-person lift.',
    images: [
      'https://images.pexels.com/photos/38869891/pexels-photo-38869891.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/38149593/pexels-photo-38149593.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/15190525/pexels-photo-15190525.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    id: '14',
    title: 'Box of Novels (40+ Books)',
    category: 'free-trade',
    owner: 'Maya H.',
    suburb: 'Newtown',
    location: 'Newtown, NSW',
    distanceKm: 5.5,
    condition: 'Good',
    conditionScore: 80,
    estimatedValue: '$120',
    matchRate: 72,
    totalTrades: 6,
    views: 876,
    freeTrade: true,
    subCategory: 'home-appliances',
    description:
      'Clearing shelves — mix of fiction, sci-fi, and a few cookbooks. Most read once, some unread. Take the whole box, swap me whatever. Plant cuttings, a board game, snacks from your country, anything reasonable.',
    images: [
      'https://images.pexels.com/photos/18132679/pexels-photo-18132679.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/36519236/pexels-photo-36519236.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/20566078/pexels-photo-20566078.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    id: '15',
    title: 'Breville Espresso Machine',
    category: 'free-trade',
    owner: 'Sam K.',
    suburb: 'Bankstown',
    location: 'Bankstown, NSW',
    distanceKm: 2.9,
    condition: 'Good',
    conditionScore: 86,
    estimatedValue: '$300',
    matchRate: 75,
    totalTrades: 4,
    views: 1456,
    freeTrade: true,
    subCategory: 'home-appliances',
    description:
      'Barista Express, about 3 years old. Makes great coffee, replaced it with a manual lever machine. Recently descaled, comes with tamper and milk jug. Trade for anything fun — vinyl, tools, a desk lamp, you name it.',
    images: [
      'https://images.pexels.com/photos/6032797/pexels-photo-6032797.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/18071814/pexels-photo-18071814.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/30276385/pexels-photo-30276385.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    id: '16',
    title: 'Vintage Cruiser Bicycle',
    category: 'free-trade',
    owner: 'Olivia B.',
    suburb: 'Chatswood',
    location: 'Chatswood, NSW',
    distanceKm: 1.7,
    condition: 'Fair',
    conditionScore: 70,
    estimatedValue: '$180',
    matchRate: 65,
    totalTrades: 2,
    views: 634,
    freeTrade: true,
    subCategory: 'sports-fitness',
    description:
      'Single-speed cruiser with wicker basket, rides fine but could use a service. The basket alone is worth the trade. Looking for anything — a houseplant, art supplies, a ukulele. Make me an offer.',
    images: [
      'https://images.pexels.com/photos/38495142/pexels-photo-38495142.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/6156545/pexels-photo-6156545.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/38495141/pexels-photo-38495141.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
];
