// src\lib\store.ts
import { create } from "zustand";
import { WebsiteData, Page } from "./getWebsiteData";

interface StoreState {
  websiteId: string | null;
  websiteData: WebsiteData | null;
  pages: Page[];
  setWebsiteId: (id: string) => void;
  setWebsiteData: (data: WebsiteData) => void;
  setPages: (pages: Page[]) => void;
  initializeWebsiteData: () => Promise<void>;
}

const useStore = create<StoreState>((set) => ({
  websiteId: null,
  websiteData: null,
  pages: [],
  setWebsiteId: (id: string) => set({ websiteId: id }),
  setWebsiteData: (data: WebsiteData) => set({ websiteData: data }),
  setPages: (pages: Page[]) => set({ pages }),
  initializeWebsiteData: async () => {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const response = await fetch(
        `${baseUrl}/api/websites/websites?search=production`,
      );
      const data = await response.json();
      if (data && data.id) {
        set({
          websiteId: data.id,
          websiteData: data,
          pages: data.pages || [],
        });
      }
    } catch (error) {
      console.error("Error initializing website data:", error);
    }
  },
}));

export default useStore;
