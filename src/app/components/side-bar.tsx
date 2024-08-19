'use client'

import { useCallback } from "react";
import Input from "../components/input";
import Button from "./button";
import useFormStore from "../lib/form-store";

const SideBar = () => {
    const { setName, setIncome } = useFormStore()

    return (
        <div className="col-span-2 bg-secondary grid content-center justify-center">
            <div className="w-[330px] flex flex-col gap-3xl">
                <h1 className="text-foreground text-xl leading-12 font-extralight">
                    What's your carbon footprint?
                </h1>
                <form className="flex flex-col gap-xl">
                    <Input
                        type="text"
                        label="Name"
                        onChange={setName}
                    />
                    <Input
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
