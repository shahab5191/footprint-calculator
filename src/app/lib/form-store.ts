import { create } from "zustand";

interface FormStoreState {
    username: string;
    income: number;
    changed: boolean;
    errors: {
        name?: string;
        income?: string;
    };
    annual?: number;
    bearerToken?: string;
    setAnnual: (value: number) => void;
    resetAnnual: () => void;
    setIncome: (value: string) => void;
    setName: (name: string) => void;
    setToken: (token: string) => void;
}

const useFormStore = create<FormStoreState>((set) => ({
    username: "",
    income: 0,
    errors: {},
    annual: 0,
    changed: true,
    bearerToken: undefined,

    setToken: (token: string) => set((state) => ({...state, bearerToken: token})),
    resetAnnual: () => set((state) => ({ ...state, annual: undefined })),
    setIncome: (value: string) => {
        const newIncom = parseInt(value);

        set((state) => ({
            ...state,
            changed: true,
            errors: {
                ...state.errors,
                income: isNaN(newIncom)
                    ? "Income must be a valid numbers"
                    : undefined,
            },
            income: isNaN(newIncom) ? 0 : newIncom,
        }));
    },

    setName: (name: string) => {
        set((state) => ({
            ...state,
            changed: true,
            errors: {
                ...state.errors,
                name:
                    name.length < 3 || name.length > 24
                        ? "Name must be between 3 and 24 characters."
                        : undefined,
            },
            username: name,
        }));
    },
    setAnnual: (value: number) =>
        set((state) => ({ ...state, changed: false, annual: value })),
}));

export default useFormStore;
