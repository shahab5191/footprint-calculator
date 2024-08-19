import { create } from "zustand";

interface EmissionStoreState {
    daily: number;
    annual: number;
    setDaily: (value: number) => void;
    setAnnual: (value: number) => void;
}

const useEmissionStore = create<EmissionStoreState>((set) => ({
    daily: 0,
    annual: 0,
    setDaily: (value: number) => set(() => ({ daily: value })),
    setAnnual: (value: number) => set(() => ({ annual: value })),
}));

export default useEmissionStore;
