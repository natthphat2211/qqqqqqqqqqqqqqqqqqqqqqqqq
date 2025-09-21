// /store/portfolioStore.js
import create from "zustand";
import { persist } from "zustand/middleware";

export const usePortfolioStore = create(persist((set, get) => ({
  portfolios: [],
  addPortfolio: (portfolio) => {
    // ensure gpa stored as number
    const p = { ...portfolio, gpa: Number(portfolio.gpa) };
    set((state) => ({ portfolios: [...state.portfolios, p] }));
  },
  updatePortfolio: (id, patch) =>
    set((state) => ({
      portfolios: state.portfolios.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    })),
  removePortfolio: (id) =>
    set((state) => ({ portfolios: state.portfolios.filter((p) => p.id !== id) })),
  clearAll: () => set({ portfolios: [] }),
}), { name: "portfolio-storage-v1" }));
