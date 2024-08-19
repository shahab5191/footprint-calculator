"use client";

import Input from "../components/input";
import Button from "./button";
import useFormStore from "../lib/form-store";
import { useCallback } from "react";
import EmissionResponseSchema from "../lib/data-schema";

interface PropsType {
    fetchData: (income: number) => Promise<number | null>;
}

const SideBar = (props: PropsType) => {
    const {
        errors,
        username,
        income,
        setName,
        setIncome,
        setAnnual,
        resetAnnual,
        setLoading,
    } = useFormStore();

    const calculateEmission = useCallback(
        async (_: any) => {
            if (errors.name !== undefined || errors.income !== undefined) {
                return;
            }

            setLoading(true);

            const emission = await props.fetchData(income);
            if (emission === null) {
                resetAnnual();
            } else {
                setAnnual(emission);
            }

            setLoading(false);
        },
        [username, income]
    );

    return (
        <div className="col-span-2 bg-secondary grid content-center justify-center">
            <div className="w-[330px] flex flex-col gap-3xl">
                <h1 className="text-foreground text-xl leading-12 font-extralight">
                    What's your carbon footprint?
                </h1>
                <form
                    className="flex flex-col gap-xl"
                    action={calculateEmission}
                >
                    <Input
                        name="name"
                        type="text"
                        label="Name"
                        onChange={setName}
                    />
                    <Input
                        name="income"
                        type="number"
                        label="Monthly income of household after tax"
                        onChange={setIncome}
                    />
                    <Button>Calculate Footprint</Button>
                </form>
            </div>
        </div>
    );
};

export default SideBar;
