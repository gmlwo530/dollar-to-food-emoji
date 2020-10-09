export interface FoodEmoji {
  label: string;
  emoji: string;
  price: number;
  result: number;
}

export enum Food {
  lemon = "lemon",
  watermelon = "watermelon",
  apple = "apple",
  kiwi = "kiwi",
  grape = "grape",
  pineapple = "pineapple",
  banana = "banana",
  melon = "melon",
}

export const foodEmojis: FoodEmoji[] = [
  { emoji: "🍋", label: Food.lemon, price: 0.6, result: 0 },
  { emoji: "🍉", label: Food.watermelon, price: 20, result: 0 },
  { emoji: "🍎", label: Food.apple, price: 0.9, result: 0 },
  { emoji: "🥝", label: Food.kiwi, price: 1.2, result: 0 },
  { emoji: "🍇", label: Food.grape, price: 2.7, result: 0 },
  { emoji: "🍍", label: Food.pineapple, price: 5.15, result: 0 },
  { emoji: "🍌", label: Food.banana, price: 2, result: 0 },
  { emoji: "🍈", label: Food.melon, price: 9, result: 0 },
];

export const dollarToFoodEmoji = (dollar: number): FoodEmoji[] => {
  return foodEmojis.map((item) => {
    return { ...item, result: Math.round(dollar / item.price) };
  });
};
