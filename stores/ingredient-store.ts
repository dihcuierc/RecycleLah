import { useMemo } from "react";
import { create } from "zustand";

export type Ingredient = {
  id: string;
  name: string;
  expiry: string;
  image: string;
  selected: boolean;
};

type State = {
  ingredients: Ingredient[];
};

type Actions = {
  setIngredients: (ingredients: Ingredient[]) => void;
  selectIngredient: (IngredientId: string) => void;
  clearSelection: () => void;
};

export const useIngredientStore = create<State & Actions>()((set) => ({
  ingredients: [],
  setIngredients: (ingredients) => set({ ingredients: ingredients }),
  selectIngredient: (ingredientId: string) =>
    set((state) => ({
      ingredients: [...state.ingredients].map((i) => {
        if (i.id === ingredientId) {
          return { ...i, selected: !i.selected };
        } else {
          return { ...i };
        }
      }),
    })),
  clearSelection: () =>
    set((state) => ({
      ingredients: [...state.ingredients].map((i) => ({
        ...i,
        selected: false,
      })),
    })),
}));

export const useSelected = () => {
  const ingredients = useIngredientStore((state) => state.ingredients);
  return useMemo(
    () => ingredients.filter((ingredient) => ingredient.selected),
    [ingredients]
  );
};
