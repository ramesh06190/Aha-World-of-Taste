import images from './images';

const wines = [
  {
    title: 'Chilli Chicken',
    price: '$16',
    tags: 'Starter',
  },
  {
    title: 'Mutton Kebab',
    price: '$19',
    tags: 'Starter',
  },
  {
    title: 'Chicken Biryani',
    price: '$14',
    tags: 'MainCourse',
  },
  {
    title: 'Hyderabadi Mutton Biryani',
    price: '$31',
    tags: 'MainCourse',
  },
  {
    title: 'Shrimp pulav',
    price: '$16',
    tags: 'MainCourse',
  },
];

const cocktails = [
  {
    title: 'Aperol Sprtiz',
    price: '$20',
    tags: 'Aperol | soda | 30 ml',
  },
  {
    title: "Dark 'N' Stormy",
    price: '$16',
    tags: 'Dark rum | Ginger beer | Slice of lime',
  },
  {
    title: 'Daiquiri',
    price: '$10',
    tags: 'Rum | Citrus juice | Sugar',
  },
  {
    title: 'Old Fashioned',
    price: '$31',
    tags: 'Bourbon | Brown sugar | Angostura Bitters',
  },
  {
    title: 'Negroni',
    price: '$26',
    tags: 'Gin | Sweet Vermouth | Campari | Orange garnish',
  },
];

const awards = [
  {
    imgUrl: images.award02,
    title: 'Bib Gourmond',
    subtitle: 'Celebrating Affordable Gastronomic Excellence',
  },
  {
    imgUrl: images.award01,
    title: 'Rising Star',
    subtitle: 'Celebrating Excellence in Culinary Delights.',
  },
  {
    imgUrl: images.award05,
    title: 'AA Hospitality',
    subtitle: 'Recognizing Excellence in the UK\'s Hospitality Industry.',
  },
  {
    imgUrl: images.award03,
    title: 'Outstanding Chef',
    subtitle: 'Recognizing the Prowess of Outstanding Chefs.',
  },
];

export default { wines, cocktails, awards };
