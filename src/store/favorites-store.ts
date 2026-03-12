import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoritesStore = {
  ids: string[];
  toggle: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clear: () => void;
};

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (productId) => {
        const ids = get().ids;
        if (ids.includes(productId)) {
          set({ ids: ids.filter((id) => id !== productId) });
        } else {
          set({ ids: [...ids, productId] });
        }
      },
      isFavorite: (productId) => get().ids.includes(productId),
      clear: () => set({ ids: [] }),
    }),
    { name: "dropstore-favorites" },
  ),
);
