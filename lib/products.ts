
export type Product = {
  id: string;
  name: string;
  category: "Specials" | "Ordinary";
  price: number;
  image: string;
  description: string;
};

const specialNames = [
  "Ajmeer Kalakhand",
  "White Kalakhand",
  "Milk Mysorepak",
  "Diamond Burfi",
  "Kismiss Peda",
  "Shimla Roll",
  "Dry Fruit Burfi",
  "Malai Burfi",
  "Butter Scotch",
  "Sunniunda",
  "Adhura Peda",
  "Khova Puri",
  "Special Kalakhand",
  "Annamaya Laddu",
  "Kaju Papidi",
];

const ordinaryNames = [
  "Chocolate Burfi",
  "Ajmeer Kalakhand",
  "Soan Patti",
  "Soan Papid",
  "Mysorepak",
  "Butter Scotch Burfi",
  "Halwa",
  "Kismiss Peda",
  "Madhura Peda",
  "Khaja",
  "Baadusha",
  "Malai Roll",
  "Peda",
  "Boondi Laddu",
  "Diamond Burfi",
];

export const products: Product[] = [
  ...specialNames.map((name, index) => ({
    id: `special-${index + 1}`,
    name,
    category: "Specials" as const,
    price: 680,
    image: "",
    description: `${name} from the Specials collection at Harish Reddy Sweets.`,
  })),

  ...ordinaryNames.map((name, index) => ({
    id: `ordinary-${index + 1}`,
    name,
    category: "Ordinary" as const,
    price: 600,
    image: "",
    description: `${name} from the Ordinary collection at Harish Reddy Sweets.`,
  })),
];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}
