/**
 * STC Events & Hackathons Starter Dataset
 * Derived from STC_EVENTS_DESIGN.md specifications.
 * Note: External opportunities are discovery content only and not organized by STC.
 */

export const HACKATHON_FILTERS = [
  { id: 'ALL', label: 'ALL' },
  { id: 'AI', label: 'AI' },
  { id: 'WEB', label: 'WEB' },
  { id: 'OPEN SOURCE', label: 'OPEN SOURCE' },
  { id: 'HARDWARE', label: 'HARDWARE' },
  { id: 'OTHER', label: 'OTHER' },
];

export const MODE_FILTERS = [
  { id: 'ALL', label: 'ALL MODES' },
  { id: 'OFFLINE', label: 'OFFLINE' },
  { id: 'ONLINE', label: 'ONLINE' },
];

export const EXTERNAL_HACKATHONS = [
  {
    id: 'hackrit',
    index: '01',
    name: 'HACKRIT',
    date: '11 SEP 2026',
    mode: 'OFFLINE',
    themeDisplay: 'NO RESTRICTIONS',
    categories: ['OTHER'],
    location: 'BENGALURU',
    platform: 'DEVFOLIO',
    status: 'OPEN',
    description:
      'A 24-hour hackathon bringing together creative minds to build impactful solutions with open problem statements.',
    externalUrl: 'https://devfolio.co',
  },
  {
    id: 'metamorph',
    index: '02',
    name: 'METAMORPH 2.0',
    date: '12 SEP 2026',
    mode: 'OFFLINE',
    themeDisplay: 'BLOCKCHAIN / AI / HARDWARE',
    categories: ['AI', 'HARDWARE', 'OTHER'],
    location: 'HYDERABAD',
    platform: 'DEVFOLIO',
    status: 'OPEN',
    description:
      'Explore the boundaries of decentralized tech, intelligence systems, and hardware prototypes in a 36-hour sprint.',
    externalUrl: 'https://devfolio.co',
  },
  {
    id: 'binary-hacks',
    index: '03',
    name: 'BINARY HACKS 4.0',
    date: '21 SEP 2026',
    mode: 'OFFLINE',
    themeDisplay: 'NO RESTRICTIONS',
    categories: ['OPEN SOURCE', 'OTHER'],
    location: 'CHENNAI',
    platform: 'DEVFOLIO',
    status: 'OPEN',
    description:
      'A multidisciplinary technical hackathon encouraging students to turn experimental concepts into viable open-source software.',
    externalUrl: 'https://devfolio.co',
  },
  {
    id: 'cognition',
    index: '04',
    name: "COGNITION — GAMEJAM '26",
    date: '25 SEP 2026',
    mode: 'OFFLINE',
    themeDisplay: 'GAME DEVELOPMENT',
    categories: ['WEB', 'OTHER'],
    location: 'PUNE',
    platform: 'DEVFOLIO',
    status: 'OPEN',
    description:
      '48 hours of rapid prototyping, mechanics design, and interactive storytelling for indie game and interactive web developers.',
    externalUrl: 'https://devfolio.co',
  },
  {
    id: 'nexhack',
    index: '05',
    name: 'NEXHACK 2.0',
    date: '25–26 SEP 2026',
    mode: 'OFFLINE',
    themeDisplay: 'AI / REAL-WORLD PROBLEMS',
    categories: ['AI', 'WEB'],
    location: 'NEW DELHI',
    platform: 'DEVFOLIO',
    status: 'OPEN',
    description:
      'Building real-world AI applications, intelligent agents, and civic technology to tackle pressing community challenges.',
    externalUrl: 'https://devfolio.co',
  },
];
