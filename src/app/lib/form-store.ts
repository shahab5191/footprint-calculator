import { create } from "zustand";

interface FormStoreState {
    username: string;
    income: number;
    setIncome: (value: number) => void;
    setName: (name: string) => void;
}

const useFormStore = create<FormStoreState>((set) => ({
    username: "",
    income: 0,
    setIncome: (value: number) => set(() => ({ income: value })),
    setName: (name: string) => set(() => ({ username: name })),
}));

export default useFormStore;
