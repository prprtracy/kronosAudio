// src/config/partners.ts

export type PartnerRole = "Distributor" | "Dealer" | "Service";

export type RegionId =
  | "north-america"
  | "europe"
  | "asia-pacific"
  | "middle-east"
  | "latin-america";

export type Partner = {
  id: string;
  name: string;
  role: PartnerRole;

  region: RegionId;
  country: string;
  city?: string;

  // 显示用
  tagline?: string;
  contactPerson?: string; // 新增：保留联系人字段，很有用
  addressLines?: string[];
  phone?: string;
  email?: string;
  website?: string;

  // 品牌控制
  isFeatured?: boolean;
};

export const REGIONS: { id: RegionId; label: string }[] = [
  { id: "north-america", label: "North America" },
  { id: "europe", label: "Europe" },
  { id: "asia-pacific", label: "Asia-Pacific" },
  { id: "middle-east", label: "Middle East" },
  { id: "latin-america", label: "Latin America" },
];

export const PARTNERS: Partner[] = [
  // --- North America ---
  {
    id: "kronos-hq",
    name: "Kronos Audio (Headquarters)",
    role: "Distributor",
    region: "north-america",
    country: "Canada",
    city: "Montréal",
    tagline: "Official headquarters and global coordination.",
    contactPerson: "Louis Desjardins",
    addressLines: [
      "4035, rue Saint-Ambroise",
      "Suite 414",
      "Montréal (Québec) H4C 2E1",
    ],
    phone: "+1 (514) 939-5770",
    email: "info@kronosaudio.com",
    website: "https://www.kronosaudio.com",
    isFeatured: true,
  },
  {
    id: "usa-gtt",
    name: "GTT Audio & Video",
    role: "Distributor",
    region: "north-america",
    country: "USA",
    city: "Long Valley",
    tagline: "Premier distributor for the United States.",
    contactPerson: "Bill Parish",
    addressLines: ["356 Naughright Rd", "Long Valley, NJ 07853"],
    phone: "+1 (908) 850-3092",
    email: "av@gttaudio.com",
    website: "https://www.gttaudio.com",
  },

  // --- Asia-Pacific ---
  {
    id: "china-volent",
    name: "Volent Audio",
    role: "Distributor",
    region: "asia-pacific",
    country: "China / Hong Kong",
    city: "Kowloon",
    tagline: "Exclusive distributor for China, HK & Macau.",
    contactPerson: "Ben Lau",
    addressLines: [
      "Flat 12, 11/F, Block A",
      "Focal Industrial Centre",
      "21 Man Lok Street, Hung Hom",
      "Kowloon, Hong Kong",
    ],
    phone: "+852 3427 2308",
    email: "contact@volentaudio.com",
    website: "http://www.volentaudio.com",
  },
  {
    id: "japan-stella",
    name: "Stella Inc.",
    role: "Distributor",
    region: "asia-pacific",
    country: "Japan",
    city: "Tokyo",
    addressLines: ["1-6-20 Zenpukuji", "Suginami-ku, Tokyo 167-0041"],
    phone: "+81 3 3395 5588",
    email: "e-info@stella-inc.com",
    website: "https://stella-inc.com",
  },
  {
    id: "korea-design-audio",
    name: "Design & Audio",
    role: "Distributor",
    region: "asia-pacific",
    country: "South Korea",
    city: "Seoul",
    addressLines: ["2F, 736-8, Hannam-dong", "Yongsan-gu, Seoul"],
    phone: "+82 2 797 4001",
  },
  {
    id: "thailand-audio-excellence",
    name: "Audio Excellence",
    role: "Distributor",
    region: "asia-pacific",
    country: "Thailand",
    city: "Bangkok",
    addressLines: [
      "21/5 Ruamrudee Village",
      "Soi Ruamrudee, Ploenchit Road",
      "Lumpini, Pathumwan",
      "Bangkok 10330",
    ],
    phone: "+66 2 253 1559",
  },
  {
    id: "vietnam-huy-lan-anh",
    name: "Huy Lan Anh Audio",
    role: "Distributor",
    region: "asia-pacific",
    country: "Vietnam",
    city: "Hanoi",
    addressLines: ["11B Hai Ba Trung", "Hoan Kiem, Hanoi"],
    phone: "+84 91 323 8888",
    website: "https://huylananhaudio.vn",
  },
  {
    id: "malaysia-perfect-hifi",
    name: "Perfect Hi-Fi",
    role: "Distributor",
    region: "asia-pacific",
    country: "Malaysia",
    city: "Kuala Lumpur",
    addressLines: [
      "Wisma Perfect Hi-Fi",
      "149, Jalan Maharajalela",
      "50150 Kuala Lumpur",
    ],
    phone: "+60 3 2142 1693",
    website: "http://www.perfecthifi.com.my",
  },
  {
    id: "indonesia-sound-gallery",
    name: "Sound Gallery",
    role: "Distributor",
    region: "asia-pacific",
    country: "Indonesia",
    city: "Jakarta",
    addressLines: [
      "Level 1, Unit 1, The Pakubuwono Residence",
      "Jl. Pakubuwono VI No. 68",
      "Jakarta 12120",
    ],
    phone: "+62 21 2932 5588",
  },
  {
    id: "singapore-audio-note",
    name: "Audio Note Singapore",
    role: "Distributor",
    region: "asia-pacific",
    country: "Singapore",
    city: "Singapore",
    addressLines: [
      "1 Coleman Street",
      "#03-35 The Adelphi",
      "Singapore 179803",
    ],
    phone: "+65 6334 7639",
  },
  {
    id: "taiwan-joy-audio",
    name: "Joy Audio",
    role: "Distributor",
    region: "asia-pacific",
    country: "Taiwan",
    city: "Taipei",
    addressLines: ["No. 75, Sec. 3, Chongqing S. Rd.", "Zhongzheng Dist., Taipei City 100"],
    phone: "+886 2 2365 1968",
  },

  // --- Europe ---
  {
    id: "germany-audio-reference",
    name: "Audio Reference GmbH",
    role: "Distributor",
    region: "europe",
    country: "Germany",
    city: "Hamburg",
    tagline: "High-end audio distribution for Germany.",
    addressLines: ["Alsterkrugchaussee 435", "22335 Hamburg"],
    phone: "+49 40 533 20 359",
    email: "info@audio-reference.de",
    website: "https://www.audio-reference.de",
  },
  {
    id: "uk-decent-audio",
    name: "Decent Audio",
    role: "Distributor",
    region: "europe",
    country: "United Kingdom",
    city: "Stockton-on-Tees",
    addressLines: ["13A High Street", "Stockton-on-Tees", "Cleveland TS18 1UB"],
    phone: "+44 (0)5602 054669",
    email: "info@decentaudio.co.uk",
    website: "http://www.decentaudio.co.uk",
  },
  {
    id: "france-ana-mighty",
    name: "Ana Mighty Sound",
    role: "Distributor",
    region: "europe",
    country: "France",
    city: "Paris",
    contactPerson: "François Saint-Gérand",
    addressLines: ["4 rue de l'Ermitage", "75020 Paris"],
    phone: "+33 6 51 10 76 64",
    email: "info@anamightysound.com",
    website: "https://anamightysound.com",
  },
  {
    id: "italy-il-tempio",
    name: "Il Tempio Esoterico",
    role: "Distributor",
    region: "europe",
    country: "Italy",
    city: "Catania",
    addressLines: ["Via Ximenes, 10", "95129 Catania (CT)"],
    phone: "+39 095 536 721",
    website: "https://www.iltempioesoterico.it",
  },
  {
    id: "spain-ars-antiqua",
    name: "Ars Antiqua Audio",
    role: "Distributor",
    region: "europe",
    country: "Spain",
    city: "Madrid",
    addressLines: ["Calle de Diego de León, 22", "28006 Madrid"],
    phone: "+34 914 11 87 52",
    website: "https://arsantiquaudio.com",
  },
  {
    id: "benelux-hifi-corner",
    name: "Hifi Corner Trading",
    role: "Distributor",
    region: "europe",
    country: "Belgium / Netherlands",
    city: "Schoten",
    addressLines: ["Paalstraat 128", "2900 Schoten", "Belgium"],
    phone: "+32 3 658 34 70",
    website: "https://hificorner.be",
  },
  {
    id: "poland-audio-system",
    name: "Audio System",
    role: "Distributor",
    region: "europe",
    country: "Poland",
    city: "Warsaw",
    addressLines: ["Ul. Henryka Rodakowskiego 5", "03-504 Warszawa"],
    phone: "+48 22 677 79 00",
    website: "https://audiosystem.com.pl",
  },
  {
    id: "russia-t-art",
    name: "T-Art",
    role: "Distributor",
    region: "europe",
    country: "Russia",
    city: "Moscow",
    addressLines: ["Bolshaya Ordynka 13/9", "Moscow 115035"],
    phone: "+7 495 953 23 92",
    website: "http://www.t-art.ru",
  },
  {
    id: "greece-orpheus",
    name: "Orpheus Audio",
    role: "Distributor",
    region: "europe",
    country: "Greece",
    city: "Athens",
    addressLines: ["8, Solomou Str.", "106 83 Athens"],
    phone: "+30 210 522 55 75",
    website: "https://www.orpheusaudio.gr",
  },

  // --- Latin America ---
  // (如果需要可以加，暂无明确数据则留空或填入已知代理)
  // {
  //   id: "mexico-audio-mundi",
  //   name: "Audio Mundi",
  //   role: "Distributor",
  //   region: "latin-america",
  //   country: "Mexico",
  //   // ...
  // }
];