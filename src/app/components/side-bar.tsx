"use client";

import Input from "../components/input";
import Button from "./button";
import useFormStore from "../lib/form-store";
import { useCallback, useEffect, useState } from "react";
import { GetEmissionArgs } from "../page";

interface PropsType {
    fetchData: (args: GetEmissionArgs) => Promise<number | null>;
}

const SideBar = (props: PropsType) => {
    const [timer, setTimer] = useState<number>();
    const {
        errors,
        username,
        income,
        adults,
        children,
        setName,
        setIncome,
        setAnnual,
        setAdults,
        setChildren,
        resetAnnual,
        setLoading,
        loadData,
    } = useFormStore();

    const calculateEmission = useCallback(
        async (_: any) => {
            if (errors.name !== undefined || errors.income !== undefined) {
                return;
            }

            setLoading(true);

            const emission = await props.fetchData({
                income,
                adults,
                children,
            });
            if (emission === null) {
                resetAnnual();
            } else {
                setAnnual(emission);
            }

            setLoading(false);
        },
        [username, income, adults, children]
    );

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        clearTimeout(timer);
        const timerId = setTimeout(() => {
            calculateEmission(true);
        }, 300);
        setTimer(timerId as any);
    }, [income, adults, children]);
    return (
        <div className="col-span-2 bg-secondary grid content-center justify-center">
            <div className="w-[330px] flex flex-col gap-xl">
                <h1 className="text-foreground text-xl leading-12 font-extralight">
                    What's your carbon footprint?
                </h1>
                <form
                    className="flex flex-col gap-s"
                    action={calculateEmission}
                >
                    <Input
                        name="name"
                        type="text"
                        label="Name"
                        default={username}
                        onChange={setName}
                    />
                    <Input
                        name="income"
                        type="number"
                        label="Monthly income of household after tax"
                        default={income}
                        onChange={setIncome}
                    />
                    <Input
                        name="adults"
                        type="number"
                        label="Number of adults"
                        default={adults}
                        onChange={setAdults}
                    />
                    <Input
                        name="children"
                        type="number"
                        label="Number of childrens"
                        default={children}
                        onChange={setChildren}
                    />
                    <Button>Calculate Footprint</Button>
                </form>
            </div>
        </div>
    );
};

export default SideBar;
