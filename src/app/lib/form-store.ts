import { create } from "zustand";

interface FormStoreState {
    username: string;
    income: number;
    errors: {
        name?: string;
        income?: string;
    };
    setIncome: (value: string) => void;
    setName: (name: string) => void;
}

const useFormStore = create<FormStoreState>((set) => ({
    username: "",
    income: 0,
    errors: {},
    setIncome: (value: string) => {
        const newIncom = parseInt(value);

        set((state) => ({
            ...state,
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
}));

export default useFormStore;
