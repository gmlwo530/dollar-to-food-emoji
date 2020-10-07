export interface FoodEmoji {
  label: string;
  emoji: string;
  price: number;
  result: number;
}

export const foodEmojis: FoodEmoji[] = [
  { emoji: "🍋", label: "lemon", price: 0.1, result: 0 },
  { emoji: "🍌", label: "banana", price: 0.2, result: 0 },
  { emoji: "🍎", label: "apple", price: 0.3, result: 0 },
];

export const dollarToFoodEmoji = (dollar: number): FoodEmoji[] => {
  return foodEmojis.map((item) => {
    return { ...item, result: Math.round(dollar / item.price) };
  });
};
