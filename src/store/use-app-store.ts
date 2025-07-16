import { create } from "zustand";
import { persist } from "zustand/middleware";

type FilterType =
  | "media-production"
  | "events-management"
  | "printing"
  | "booth-productions";

interface AppState {
  activeVideoId: string | null;
  setActiveVideoId: (id: string | null) => void;
  currentFilter: FilterType;
  setCurrentFilter: (filter: FilterType) => void;
  language: "en" | "ar";
  setLanguage: (lang: "en" | "ar") => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Video player state
      activeVideoId: null,
      setActiveVideoId: (id) => set({ activeVideoId: id }),

      // Content filtering
      currentFilter: "media-production",
      setCurrentFilter: (filter) => set({ currentFilter: filter }),

      // Language preference
      language: "en",
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: "darb-app-storage",
      partialize: (state) => ({ language: state.language }),
    },
  ),
);
