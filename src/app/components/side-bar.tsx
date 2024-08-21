"use client";

import Input from "../components/input";
import Button from "./button";
import useFormStore from "../lib/form-store";
import { useCallback, useEffect } from "react";
import { GetEmissionArgs } from "../page";

interface PropsType {
    fetchData: (args: GetEmissionArgs) => Promise<number | null>;
}

const SideBar = (props: PropsType) => {
    const {
        errors,
        username,
        income,
        adults,
        children,
        changed,
        firstRun,
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
            if (firstRun){
                return
            }
            if (errors.income !== undefined) {
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
        [
            income,
            adults,
            children,
            errors.income,
            firstRun,
            resetAnnual,
            setAnnual,
            setLoading,
            props,
        ]
    );

    useEffect(() => {
        loadData();
    }, [loadData]);

    useEffect(() => {
        const timerId = setTimeout(()=>{
            calculateEmission(true);
        }, 500);

        return () => clearTimeout(timerId)
    }, [income, adults, children, calculateEmission]);

    return (
        <div className="col-span-2 bg-secondary grid content-center justify-center">
            <div className="w-[330px] flex flex-col gap-xl">
                <h1 className="text-foreground text-xl leading-12 font-extralight">
                    What&apos;s your carbon footprint?
                </h1>
                <form
                    className="flex flex-col gap-s"
                    action={calculateEmission}
                >
                    <Input
                        name="name"
                        type="text"
                        label="Name"
                        defaultInput={username}
                        onChange={setName}
                    />
                    <Input
                        name="income"
                        type="number"
                        label="Monthly income of household after tax"
                        defaultInput={income}
                        onChange={setIncome}
                        min={0}
                    />
                    <Input
                        name="adults"
                        type="number"
                        label="Number of adults"
                        defaultInput={adults}
                        onChange={setAdults}
                        min={1}
                    />
                    <Input
                        name="children"
                        type="number"
                        label="Number of childrens"
                        defaultInput={children}
                        onChange={setChildren}
                        min={0}
                    />
                    <Button>Calculate Footprint</Button>
                </form>
            </div>
        </div>
    );
};

export default SideBar;
