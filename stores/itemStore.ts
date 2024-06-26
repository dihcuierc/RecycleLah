import { create } from "zustand";

interface UserIngredient {
  uri: string;
  name: string;
  expiry: string;
}

interface StoreState {
  items: UserIngredient[];
  setItems: (items: UserIngredient[]) => void;
  updateItem: (index: number, updatedItem: UserIngredient) => void;
  deleteItem: (index: number) => void;
}

export const useStore = create<StoreState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  updateItem: (index, updatedItem) =>
    set((state) => ({
      items: state.items.map((item, i) => (i == index ? updatedItem : item)),
    })),
  deleteItem: (index) =>
    set((state) => ({
      items: state.items.filter((_, i) => i != index),
    })),
}));
