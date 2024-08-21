import { create } from "zustand";

interface FormStoreState {
    username: string;
    income: number;
    adults: number;
    children: number;
    changed: boolean;
    errors: {
        name?: string;
        income?: string;
        adults?: string;
        children?: string;
    };
    annual?: number;
    loading: boolean;
    token?: string;
    firstRun: boolean;
    setAnnual: (value: number) => void;
    resetAnnual: () => void;
    setIncome: (value: string) => void;
    setAdults: (value: string) => void;
    setChildren: (value: string) => void;
    setName: (name: string) => void;
    setLoading: (loading: boolean) => void;
    setToken: (token: string) => void;
    loadData: () => void;
}

const useFormStore = create<FormStoreState>((set) => ({
    username: "",
    income: 0,
    adults: 1,
    children: 0,
    errors: {},
    annual: 0,
    changed: true,
    loading: false,
    token: undefined,
    firstRun: true,

    setToken: (token: string) => set((state) => ({ ...state, token })),
    setLoading: (loading: boolean) => set((state) => ({ ...state, loading })),
    resetAnnual: () => set((state) => ({ ...state, annual: undefined })),
    setIncome: (value: string) => {
        var income = parseInt(value);
        let error: string | undefined;
        if (isNaN(income)) {
            error = "Income must be a valid numbers";
            income = 0;
        }
        set((state) => {
            saveAllFields({
                income,
                adults: state.adults,
                children: state.children,
                username: state.username,
                annual: state.annual,
            });
            return {
                ...state,
                changed: true,
                errors: {
                    ...state.errors,
                    income: error,
                },
                income,
                firstRun: false
            };
        });
    },
    setAdults: (value: string) => {
        let newNumber = parseInt(value);
        let error: string | undefined;
        if (isNaN(newNumber)) {
            error = "Adults number be a valid numbers";
            newNumber = 1;
        }

        set((state) => {
            saveAllFields({
                income: state.income,
                adults: newNumber,
                children: state.children,
                username: state.username,
                annual: state.annual,
            });
            return {
                ...state,
                changed: true,
                errors: {
                    ...state.errors,
                    adults: error,
                },
                adults: newNumber,
                firstRun: false
            };
        });
    },
    setChildren: (value: string) => {
        let newNumber = parseInt(value);
        let error: string | undefined;

        if (isNaN(newNumber)) {
            error = "Children number be a valid numbers";
            newNumber = 0;
        }

        set((state) => {
            saveAllFields({
                income: state.income,
                adults: state.adults,
                children: newNumber,
                username: state.username,
                annual: state.annual,
            });
            return {
                ...state,
                changed: true,
                errors: {
                    ...state.errors,
                    children: error,
                },
                children: newNumber,
                firstRun:false
            };
        });
    },

    setName: (name: string) => {
        let newName = name;
        let error: string | undefined;
        if (name.length < 3 || name.length > 24) {
            error = "Name must be between 3 and 24 characters.";
            newName = "";
        }
        set((state) => {
            saveAllFields({
                income: state.income,
                adults: state.adults,
                children: state.children,
                username: newName,
                annual: state.annual,
            });
            return {
                ...state,
                errors: {
                    ...state.errors,
                    name: error,
                },
                username: newName,
                firstRun: false
            };
        });
    },
    setAnnual: (value: number) => {
        set((state) => {
            saveAllFields({
                income: state.income,
                adults: state.adults,
                children: state.children,
                username: state.username,
                annual: value,
            });
            return { ...state, changed: false, annual: value };
        });
    },
    loadData: () => {
        const username = loadField("name");
        if (username === null) return;
        const income = loadField("income");
        if (income === null) return;
        const adults = loadField("adults");
        if (adults === null) return;
        const children = loadField("children");
        if (children === null) return;
        const annual = loadField("annual");
        if (annual === null) return;

        set((state) => ({
            ...state,
            username,
            income: parseInt(income),
            adults: parseInt(adults),
            children: parseInt(children),
            annual: parseFloat(annual),
            changed: false,
        }));
    },
}));

interface SaveAllFieldsArgs {
    username: string;
    income: number;
    adults: number;
    children: number;
    annual?: number;
}

const saveAllFields = ({
    income,
    adults,
    children,
    username,
    annual,
}: SaveAllFieldsArgs) => {
    saveField("income", String(income));
    saveField("adults", String(adults));
    saveField("children", String(children));
    saveField("annual", String(annual));
    saveField("name", username);
};

const saveField = (fieldName: string, value: string) => {
    if (fieldName.trim() === "") {
        return;
    }

    if (value === "") {
        window.localStorage.removeItem(fieldName);
    }
    window.localStorage.setItem("savedTime", String(Date.now()));
    window.localStorage.setItem(fieldName, value);
};

const loadField = (fieldName: string): string | null => {
    if (fieldName.trim() === "") {
        return null;
    }
    const savedTime = window.localStorage.getItem("savedTime");
    if (!savedTime) {
        return null;
    }

    const currentTime = Date.now();
    const duration = currentTime - parseInt(savedTime);

    if (duration > 1000 * 60 * 5) {
        return null;
    }
    const value = window.localStorage.getItem(fieldName);
    return value;
};

export default useFormStore;
