import { blueTints, goldTints, blackTints, categoryBrands } from "@ucd-lib/theme-sass/colors";

const brandSubset = [
  "primary",
  "secondary",
  "rec-pool",
  "gunrock",
  "bodega",
  "rain",
  "arboretum",
  "delta",
  "farmers-market",
  "sage",
  "golden-state",
  "rose",
  "double-decker",
  "merlot",
  "thiebaud-icing",
  "pinot",
  "cabernet"
];

/**
 * @description Sections only take a subset of the brand colors. Also we want to include our own colors.
 * @type {Array}
 * @property {string} name - The display name of the color
 * @property {string} slug - The slug of the color - if brand color, used to construct the 'layout-section--{slug}' class
 * @property {string} color - The hex value of the color
 * @property {boolean} isBrandColor - If the color is a brand color, aka it has a dedicated class
 * @property {boolean} isDark - If the color is dark, used to determine text color. only used if not a brand color
 */
export default [
  ...brandSubset.map( slug => {
    const brand = categoryBrands[slug];
    if ( !brand ) return null;
    return {
      name: brand.title,
      slug: slug,
      isBrandColor: true,
      color: brand.hex
    }
  }).filter( brand => brand ),
  {
    name: 'Wonder Blue',
    slug: 'wonder-blue',
    color: blueTints['80'].hex,
    isBrandColor: true
  },
  {
    name: 'Dark Gray',
    slug: 'dark-gray',
    color: blackTints['80'].hex,
    isBrandColor: true
  },
  {
    name: 'Light Gray',
    slug: 'light-gray',
    color: blackTints['20'].hex,
    isBrandColor: true
  },
  {
    name: "Light Blue",
    slug: "light-blue",
    isBrandColor: false,
    color: blueTints['30'].hex
  },
  {
    name: "Light Yellow",
    slug: "light-yellow",
    isBrandColor: false,
    color: goldTints['30'].hex
  },
  {
    name: "White",
    slug: "white",
    isBrandColor: false,
    color: "#fff"
  }
];
