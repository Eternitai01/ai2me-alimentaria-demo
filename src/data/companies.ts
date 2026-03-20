export interface Company {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  description: string;
  type: 'retail' | 'wholesale';
}

export const companies: Company[] = [
  {
    id: 'ferrarini',
    name: 'Ferrarini',
    tagline: 'Premium Italian Charcuterie',
    logo: '🇮🇹',
    description: 'Authentic Italian salumi, prosciutto, and cured meats since 1956. Part of Pini Group.',
    type: 'retail'
  },
  {
    id: 'litera-meat',
    name: 'Litera Meat',
    tagline: 'Global Pork Export Leader',
    logo: '🥩',
    description: 'Europe\'s leading pork processor. 160,000 heads/week, exports to 5 continents. €886M revenue.',
    type: 'wholesale'
  }
];
